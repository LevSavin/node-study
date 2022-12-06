import http from "http";
import fs from "fs";
import path from "path";
import { Server } from "socket.io"

const host = "localhost";
const port = 3000;


const server = http.createServer((req, res) => {
  if (["GET", "POST", "PUT"].includes(req.method)) {

    const filePath = path.join(process.cwd(), "./index.html");
    const rs = fs.createReadStream(filePath);

    rs.pipe(res);
  }
});
const io = new Server(server)

const clients = []
io.on('connection', (client) => { clients.push(client)

  console.log('Websocket connected')

  MyEmitter.on("send", (payload) => {
    client.emit('server-msg', Handler.send(payload))
  })
  MyEmitter.on("receive", (payload) => {
    client.emit('server-msg', Handler.receive(payload))
  })
  MyEmitter.on("sign", (payload) => {
    client.emit('server-msg', Handler.sign(payload))
  })
})

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
