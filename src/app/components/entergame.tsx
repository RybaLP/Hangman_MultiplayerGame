import React , {useState} from 'react'
import {socket} from "../../../lib/socketClient";

interface EnterGameProps {
    onJoin : (username : string , room : string ) => void;
}

const Entergame : React.FC<EnterGameProps> = ({onJoin}) => {

  const [username , setUsername] = useState('');
  const [room , setRoom] = useState('');
  const [isRoomFull, setIsRoomFull] = useState(false);

  const handleJoin = () => {
     console.log("wysylam join room");
     socket.emit('join-room', {username, room});
     onJoin(username, room);
  }

  socket.on("room-full", ()=>{
    setIsRoomFull(true);
  })


  return (
    <div className='h-[100vh] flex justify-center items-center flex-col'>
    <h1 className='font-extrabold'>HANGMAN</h1>
    <div className='w-[700px] h-[400px] flex justify-center items-center'>
        {isRoomFull && <p>Pokój jest pełny</p>}
        <div className='flex flex-col gap-7'>
            <input type='text' placeholder='enter your name' value={username} 
            onChange={(e)=>setUsername(e.target.value)}></input>

            <input type='text' placeholder='enter room code' value={room} onChange={(e)=>{
            setRoom(e.target.value);
            }}></input>

        <button className="text-white font-mono font-extrabold bg-green-500 wod" onClick={handleJoin}>Enter</button>
        </div>
    </div>
    </div>
  )
}

export default Entergame;