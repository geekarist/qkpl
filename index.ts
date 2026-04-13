import http from "node:http"

const server = http.createServer(
    async (_, res) => {
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("Hey")
    })

const PORT = 8080

server.listen(
    PORT,
    () => {
        console.log("Server started")
        console.log(`Listening on URL: http://localhost:${PORT}`)
    }
)
