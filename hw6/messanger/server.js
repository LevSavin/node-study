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
const userNames = {};

io.on('connection', (client) => {
  userNames[client.id] = `user_${Object.keys(userNames).length}`
  client.broadcast.emit('user-status', { name: userNames[client.id], status: "connected" })

  client.on('client-msg', (data) => {
    client.broadcast.emit('server-msg', { name: userNames[client.id], msg: data.msg })
    client.emit('server-msg', { name: userNames[client.id], msg: data.msg })
  })

  client.once('disconnect', reason => {
    client.broadcast.emit('user-status', { name: userNames[client.id], status: "disconnected" })
  })
})



server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
