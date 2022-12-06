import http from "http";
import url from 'url'

const host = 'localhost';
const port = 3000;


const server = http.createServer((request, response) => {
    let result;
    if (request.method === 'GET') {
        const queryParams = url.parse(request.url, true).query
        console.log(queryParams)
        result = JSON.stringify(queryParams)
    } else if(request.method === 'POST') {
        response.writeHead(200, { "Content-Type": "json" });
        let data = ''
        request.on('data', (chunk) => {
            data += chunk
            response.end(data)
        })

        request.on('end', () => {
            console.log(data)
            response.end(data)
        })

    } else {
        response.statusCode = 405;
        result = 'Method not allowed'
    }

    response.end(result)
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))