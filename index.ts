import express from "express"
import secretConfig from './secret/config.json' with { type: "json" }

const app = express()

function run<T>(block: () => T): T { return block() }

app.get('/api/places', async (req, res) => {
    const searchText = req.query.q
    res.setHeader('content-type', 'application/json')
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

