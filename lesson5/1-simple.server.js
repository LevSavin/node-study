import http from 'http'

const host = 'localhost';
const port = 3000;

const server = http.createServer((request, response) => {
    response.end('Hello world!')
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))
