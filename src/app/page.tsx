"use client"
import Letters from "./components/alphabet";
import Gallows from "./components/gallows";
import Board from "./components/board";
import Entergame from "./components/entergame";
import { useState } from "react";

export default function Home() {

  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleJoin = (username : string , room : string) => {
    setUsername(username);
    setRoom(room);
    setIsJoined(true);
  }

  return (
    <> {/* Musisz otoczyć warunkowe renderowanie elementem nadrzędnym (np. <>, <div>) */}
    <div className="flex justify-center">
      {isJoined ? (
        <> {/* Musisz otoczyć wiele elementów wewnątrz warunku elementem nadrzędnym */}
          
          <Board />

          <div className="flex justify-center mt-10 gap-10">
            <Gallows />
            <Letters />
          </div>
        </>
      ) : (
        <Entergame onJoin={handleJoin}/>
      )}
    </div>
    </>
  );
}