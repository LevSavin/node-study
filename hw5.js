import http from "http";
import url from 'url'
import fsp from "fs/promises"
import fs from "fs";
import path from "path"

const host = 'localhost';
const port = 3000;
let currentUrl = "/"

const renderChoices = (url, choices) => {
    const listItems = []
    if (url === "/") {
        choices.forEach((choice) => {
            listItems.push(`<li><a href="${ currentUrl + choice }">${ choice }</a></li>`);
        })
    } else {
        choices.forEach((choice) => {
            listItems.push(`<li><a href="${ currentUrl + '/' + choice }">${ choice }</a></li>`);
        })
    }
    return `
    <ul>
        ${ listItems.join("") }
    </ul>`
}

const handleRoute = (url, response) => {
    const currentPath = path.join(process.cwd(), url);
    fs.stat(currentPath, (err, stats) => {
        if (err) {
            response.end("404");
        } else {
            if (stats.isFile(currentPath)) {
                const rs = fs.createReadStream(currentPath, "utf-8");
                rs.pipe(response);
            } else {
                fsp
                    .readdir(currentPath)
                    .then((choices) => {
                        currentUrl = url;
                        response.end(renderChoices(url, choices));
                    })
            }
        }
    })
}

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        response.setHeader('Content-Type', 'text/html')
        const url = request.url.split("?")[0];
        handleRoute(url, response);
    }
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))

