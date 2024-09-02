const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 9000;
const io = new Server(server);

// socket.io
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on("user-message", (data) => {
        const { username, message } = data;
        io.emit("message", { username, message });
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

server.listen(PORT, () => {
    console.log("server started at port:", PORT);
});
