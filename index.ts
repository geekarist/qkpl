import express from "express"

const app = express()

app.get('/api/places', (req, res) => {
    const searchText = req.query.q
    res.setHeader('content-type', 'application/json')
    res.send({
        "places": [
            {
                "name": "Mairie",
                "city": "Montigny-sur-Loing"
            },
            {
                "name": "Supermarché",
                "city": "Montigny-sur-Loing"
            },
            {
                "name": "Gymnase",
                "city": "Montigny-sur-Loing"
            }
        ]
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

