import React from 'react'

const Letters = () => {
    const letters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className='inline-block'>
    <div className='grid grid-cols-6 grid-rows-5 w-[500px] h-[300px]'>

    {letters.map((letter,index)=>(
        <label key={index} className='p-3 bg-slate-500 w-10 h-10 rounded-lg flex items-center justify-center
        hover:transition-transform duration-100'>{letter}</label>
    ))}

    </div>
    </div>
  )
}

export default Letters