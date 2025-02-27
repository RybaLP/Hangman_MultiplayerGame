import React, { useState } from 'react';
import { socket } from "../../../lib/socketClient";
const Entergame = ({ onJoin }) => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [isRoomFull, setIsRoomFull] = useState(false);
    const handleJoin = () => {
        console.log("wysylam join room");
        socket.emit('join-room', { username, room });
        onJoin(username, room);
    };
    socket.on("room-full", () => {
        setIsRoomFull(true);
    });
    return (<div className='container w-[700px] h-[400px] bg-cyan-500 mt-10 flex justify-center items-center'>
        {isRoomFull && <p>Pokój jest pełny</p>}
        <input type='text' placeholder='enter your name' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input type='text' placeholder='enter room code' value={room} onChange={(e) => {
            setRoom(e.target.value);
        }}></input>
        <button onClick={handleJoin}>Enter</button>
    </div>);
};
export default Entergame;
