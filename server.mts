import { createServer } from "node:http";
import next from "next";
import { Server, Socket } from "socket.io";
import Word from "./models/Word";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function generateHashedPassword(password: string): string {
  return password
    .split('')
    .map((letter) => (letter === ' ' ? ' ' : '*'))
    .join('');
}

app.prepare().then(async () => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  const rooms: {
    [key: string]: {
      players: { id: string; username: string }[];
      currentPlayer: string | null;
      password: string | null;
      hashedPassword: string | null; 
      guessedLetters: string[];
      clickedLetters : string[];
      incorrectAttempts: number;
      gameState: "waiting" | "started" | "ended";
    };
  } = {};

  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", ({ room, username }) => {
      if (!rooms[room]) {
        rooms[room] = {
          players: [],
          currentPlayer: null,
          password: null,
          hashedPassword: null, 
          guessedLetters: [],
          clickedLetters: [],
          incorrectAttempts: 0,
          gameState: "waiting",
        };
      }

      if (rooms[room].players.length >= 2) {
        socket.emit("room-full");
        return;
      }

      rooms[room].players.push({ id: socket.id, username });
      socket.join(room);

      if (rooms[room].players.length === 2) {
        const passwords = [
          "computer science",
          "programming language",
          "artificial intelligence",
          "software development",
          "user interface",
          "database management",
          "network security",
          "information technology",
          "cybersecurity",
          "web development",
          "mobile application",
          "operating system",
          "data structure",
          "algorithm design",
          "machine learning",
          "cloud computing",
          "internet of things",
          "virtual reality",
          "augmented reality",
          "user experience",
        ];

        const randomIndex = Math.floor(Math.random() * passwords.length);
        rooms[room].password = passwords[randomIndex].toUpperCase();
        rooms[room].hashedPassword = generateHashedPassword(rooms[room].password); // Generowanie hashedPassword

        rooms[room].currentPlayer = rooms[room].players[Math.round(Math.random())].id;
        rooms[room].gameState = "started";
        io.to(room).emit("game-started", rooms[room]);
      } else if (rooms[room].players.length === 1) {
        rooms[room].currentPlayer = socket.id;
      }

      io.to(room).emit("user-joined", {
        username,
        players: rooms[room].players,
        currentPlayer: rooms[room].currentPlayer,
      });
    });

    socket.on("letter-click", ({ room, letter }) => {
      if (rooms[room] && rooms[room].currentPlayer === socket.id && rooms[room].password) {
        const password = rooms[room].password;
        if (password.includes(letter)) {
          rooms[room].guessedLetters.push(letter);
          rooms[room].clickedLetters.push(letter);
          // Aktualizacja hashedPassword
          rooms[room].hashedPassword = password
            .split("")
            .map((char) => (rooms[room].guessedLetters.includes(char) || char === " " ? char : "*"))
            .join("");
        } else {
          rooms[room].incorrectAttempts++;
          rooms[room].clickedLetters.push(letter);
        }

        const isGameWon = password
          .split("")
          .every((char) => char === " " || rooms[room].guessedLetters.includes(char));

        const isGameLost = rooms[room].incorrectAttempts >= 9;

        if (isGameWon || isGameLost) {
          rooms[room].gameState = "ended";
          io.to(room).emit("game-ended", {
            ...rooms[room],
            isGameWon,
            isGameLost,
          });
        } else {
          const nextPlayer = rooms[room].players.find((player) => player.id !== socket.id);
          if (nextPlayer) {
            rooms[room].currentPlayer = nextPlayer.id;
            io.to(room).emit("game-update", rooms[room]);
          }
        }
      }
    });

    socket.on("disconnect", () => {
      for (const room in rooms) {
        if (rooms[room]) {
          const playerIndex = rooms[room].players.findIndex(
            (player) => player.id === socket.id
          );
          if (playerIndex !== -1) {
            rooms[room].players.splice(playerIndex, 1);
            if (rooms[room].players.length === 1) {
              rooms[room].gameState = "waiting";
              const nextPlayer = rooms[room].players[0];
              if (nextPlayer) {
                rooms[room].currentPlayer = nextPlayer.id;
                io.to(room).emit("game-update", rooms[room]);
              }
            } else if (rooms[room].players.length === 0) {
              delete rooms[room];
            }
            break;
          }
        }
      }
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, () => {
    console.log("server is running");
  });
});