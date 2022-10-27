import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { Emitter } from "@socket.io/redis-emitter";
import express from "express";

const app = express();
import http from "http";
const server = http.createServer(app);
const io = new Server(server);

const pubClient = createClient({ url: "redis://localhost:6379" });

await pubClient.connect();
const subClient = pubClient.duplicate();
const emitter = new Emitter(pubClient);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.adapter(createAdapter(pubClient, subClient));
io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
});
io.on("connection", socket => {
    console.log("a user connected");

socket.on("chat message", msg => {
    console.log(msg);
    //emitter.socketsJoin("room1");
    io.emit("chat message", msg);
})
})
server.listen(3000, () => {
    console.log('listening on *:3000');
  });

export { };
