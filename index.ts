import express from "express"
import secretConfig from './secret/config.json' with { type: "json" }
import sqlite from "node:sqlite"

const app = express()

function run<T>(block: () => T): T { return block() }

const database = new sqlite.DatabaseSync('database.db')
const dbInitReq = `
CREATE TABLE IF NOT EXISTS searches (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    query TEXT UNIQUE ON CONFLICT REPLACE,
    submit_date TEXT
)
`.trim()

database.exec(dbInitReq)

const selectSearchesReq = `
SELECT * 
FROM searches 
ORDER BY submit_date DESC
`.trim()

app.get('/api/searches', async (req, res) => {
    const stmt = database.prepare(selectSearchesReq)
    const searches = stmt.all().map((record) => {
        const submitDateStr = record.submit_date?.toString() ?? "unknown"
        return {
            id: record.id,
            query: record.query,
            submit_date: new Date(submitDateStr).toLocaleString()
        }
    })
    const resVal = {
        status: 200,
        body: {
            searches: searches
        }
    }
    res.status(resVal.status).send(resVal.body)
})

const insertSearchReq = `
INSERT INTO searches
VALUES (?, ?, ?)
`.trim()

app.get('/api/places', async (req, res) => {
    const searchText = req.query.q?.toString()
    res.setHeader('content-type', 'application/json')
    const stmt = database.prepare(insertSearchReq)
    if (searchText) {
        stmt.run(null, searchText, new Date().toISOString())
    }
    const result = await run(async () => {
        try {
            const remoteToken = secretConfig.jawg["access-token"]
            const remoteRes = await fetch(
                `https://api.jawg.io/places/v1/autocomplete?text=${searchText}&access-token=${remoteToken}`
            )
            if (remoteRes.ok) {
                const remoteResJson = await remoteRes.json()
                return {
                    status: 200,
                    body: {
                        places: remoteResJson.features.map(
                            (feature: any) => {
                                return {
                                    name: feature.properties.label
                                }
                            })
                    },
                }
            } else {
                console.log(
                    `Failure getting places: ${remoteRes.status} (${remoteRes.statusText})`
                )
                console.log(`Failure response body: ${remoteRes.text}`)
                return {
                    status: 503,
                    body: {
                        "type": "PLACES_UPSTREAM_FAILURE",
                        "message": "Upstream service failed"
                    }
                }
            }
        } catch (remoteError) {
            console.log(
                `Error getting places: ${remoteError})`
            )
            return {
                status: 503,
                body: {
                    "type": "PLACES_UPSTREAM_ERROR",
                    "message": "Upstream service exception"
                }
            }
        }
    })
    res.status(result.status).send(result.body)
})

const PORT = 8080

app.listen(
    PORT,
    (err) => {
        console.log(`App listening on URL: http://localhost:${PORT}`)
        if (err) {
            console.log(`Error starting app: ${err}`)
        }
    }
)

