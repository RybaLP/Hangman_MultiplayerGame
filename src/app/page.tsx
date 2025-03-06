"use client";
import Letters from "./components/alphabet";
import Gallows from "./components/gallows";
import Board from "./components/board";
import Entergame from "./components/entergame";
import { useEffect, useState } from "react";
import { socket } from "../../lib/socketClient";
import Waiting from "./components/waiting";

export default function Home() {
  
  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [clickedLetters, setClickedLetters] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [gameState, setGameState] = useState<"waiting" | "started" | "ended">("waiting");
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false); // Dodano isWaiting


  useEffect(() => {
    socket.on("game-started", (roomState) => {
      setGameState(roomState.gameState);
      setCurrentPlayer(roomState.currentPlayer);
      setPassword(roomState.password);
      setHashedPassword(roomState.hashedPassword);
      setGuessedLetters(roomState.guessedLetters);
      setIncorrectAttempts(roomState.incorrectAttempts);
      setIsWaiting(false); // Ustawienie isWaiting na false
      setClickedLetters(roomState.clickedLetters);
    });

    socket.on("game-update", (roomState) => {
      setGameState(roomState.gameState);
      setCurrentPlayer(roomState.currentPlayer);
      setHashedPassword(roomState.hashedPassword);
      setGuessedLetters(roomState.guessedLetters);
      setIncorrectAttempts(roomState.incorrectAttempts);
      setClickedLetters(roomState.clickedLetters);
    });

    socket.on("game-ended", (roomState) => {
      setGameState(roomState.gameState);
      setCurrentPlayer(roomState.currentPlayer);
      setHashedPassword(roomState.hashedPassword);
      setGuessedLetters(roomState.guessedLetters);
      setIncorrectAttempts(roomState.incorrectAttempts);
    
    });

    socket.on("user-joined", (roomState) => {
      if (roomState.players.length === 1 && isJoined) {
        setIsWaiting(true); 
      }
    });

    return () => {
      socket.off("game-started");
      socket.off("game-update");
      socket.off("game-ended");
      socket.off("user-joined");
    };
  }, [isJoined]);

  const handleJoin = (username: string, room: string) => {
    setUsername(username);
    setRoom(room);
    setIsJoined(true);
  };

  const handleLetterClick = (letter: string) => {
    console.log("clicked letter: " + letter);
    socket.emit("letter-click", { room, letter });
  };

  return (
    <>
      <div className="flex justify-center">
        {isJoined ? (
          <>
            {isWaiting ? (
              <Waiting room={room}/>
            ) : (
              <>
                <Board hashedPassword={hashedPassword} guessedLetters={guessedLetters} />
                <div className="flex justify-center mt-10 gap-10">
                  <Gallows incorrectAttempts={incorrectAttempts} />
                  <Letters
                    guessedLetters = {guessedLetters}
                    clickedLetters={clickedLetters}
                    handleLetterClick={handleLetterClick}
                    disabled={gameState !== "started" || currentPlayer !== socket.id}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <Entergame onJoin={handleJoin} />
        )}
      </div>
    </>
  );
}