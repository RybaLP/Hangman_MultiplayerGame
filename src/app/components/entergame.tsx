import React , {useState} from 'react'
import {socket} from "../../../lib/socketClient";

interface EnterGameProps {
    onJoin : (username : string , room : string ) => void;
}

const Entergame : React.FC<EnterGameProps> = ({onJoin}) => {

  const [username , setUsername] = useState('');
  const [room , setRoom] = useState('');

  const handleJoin = () => {
     console.log("wysylam join room");
     socket.emit('join-room', {username, room});
     onJoin(username, room);
  }


  return (
    <div className='container w-[700px] h-[400px] bg-cyan-500 mt-10 flex justify-center items-center'>
        <input type='text' placeholder='enter your name' value={username} 
        onChange={(e)=>setUsername(e.target.value)}></input>
        <input type='text' placeholder='enter room code' value={room} onChange={(e)=>{
            setRoom(e.target.value);
        }}></input>
        <button onClick={handleJoin}>Enter</button>
    </div>
  )
}

export default Entergame;