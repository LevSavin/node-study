import http from "http";
import url from 'url'

const host = 'localhost';
const port = 3000;

const users = [
    {name: 'Anton', age: 25, id: 1},
    {name: 'Sergei', age: 34, id: 2},
    {name: 'Elena', age: 30, id: 3},
]

const routes = {
    '/': '<h1>Hello world!</h1>',
    '/users': users,
    '/users/:id': (params) => {}
}

const findRoutes = (url) => {
    if(routes[url]) {
        return routes[url]
    }
}

const server = http.createServer((request, response) => {
    let result;
    if (request.method === 'GET') {
        response.setHeader('Content-type', 'application/json')
        const route = findRoutes(request.url.split('?')[0])
        result = JSON.stringify(route)
    }  else {
        response.statusCode = 405;
        result = 'Method not allowed'
    }

    response.end(result)
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))