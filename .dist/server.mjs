import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(async () => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    // Dodajemy stan serwera
    const rooms = {};
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        socket.on("join-room", ({ room, username }) => {
            if (!rooms[room]) {
                rooms[room] = { players: [], currentPlayer: null };
            }
            if (rooms[room].players.length >= 2) {
                // Pokój jest pełny
                socket.emit("room-full");
                return;
            }
            rooms[room].players.push({ id: socket.id, username });
            socket.join(room);
            if (rooms[room].players.length === 1) {
                // Pierwszy gracz w pokoju otrzymuje turę
                rooms[room].currentPlayer = socket.id;
            }
            console.log(`User ${username} joined room ${room}`);
            io.to(room).emit("user-joined", {
                username,
                players: rooms[room].players,
                currentPlayer: rooms[room].currentPlayer,
            });
        });
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
    httpServer.listen(port, () => {
        console.log("server is running");
    });
});
