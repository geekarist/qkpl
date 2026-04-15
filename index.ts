import express from "express"
import secretConfig from './secret/config.json' with { type: "json" }

const app = express()

app.get('/api/places', async (req, res) => {
    const searchText = req.query.q
    res.setHeader('content-type', 'application/json')
    const remoteToken = secretConfig.jawg["access-token"]
    const remoteRes = await fetch(
        `https://api.jawg.io/places/v1/autocomplete?text=${searchText}&access-token=${remoteToken}`
    )
    const remoteResJson = await remoteRes.json()
    res.send({
        places: remoteResJson.features.map(
            (feature: any) => {
                return {
                    name: feature.properties.label
                }
            })
    })
})

const PORT = 8080

app.listen(
    PORT,
    (err) => {
        console.log(`App listening on URL: http://localhost:${PORT}`)
        if (err) {
            console.log(`App called back with error: ${err}`)
        }
    }
)

