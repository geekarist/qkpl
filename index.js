import http from "node:http"

const server = http.createServer(async (req, res) => {
    res.writeHead(200, { "content-type": "text/plain" })
    res.end("Yo")
})

const PORT = 8080

server.listen(PORT, () => {
    console.log("Server started")
    console.log(`Listening on URL: http://localhost:${PORT}`)
})