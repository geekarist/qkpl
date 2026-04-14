import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("Hello")
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

