import http from 'http'

const host = 'localhost';
const port = 3000;

const server = http.createServer((request, response) => {

    response.setHeader('Content-Type', 'text/html')
    response.setHeader('SomeCustomHeader', 'value test')
    response.writeHead(200, {
        'SomeCustomHeader2': 'value test2'
    })
    response.end('<h1>Hello world!</h1>');
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))
