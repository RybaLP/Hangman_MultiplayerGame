import React from 'react'
import Image from 'next/image'

interface WaitingProps {
    room : string
}


const Waiting : React.FC<WaitingProps>= ({room}) => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <div className='h-[300px] w-[400px] flex flex-col items-center justify-center bg-black text-cyan-400
        font-extrabold border-r-emerald-500 rounded-3xl p-3 font-mono] text-2xl'>
            <h1>Waiting for player to join</h1>
            <h1>Lobby name: {room}</h1>
            <Image src="/loading.gif" alt="Ładowanie..." className='mt-5' width={100} height={100} />
        </div>
    </div>
  )
}

export default Waiting