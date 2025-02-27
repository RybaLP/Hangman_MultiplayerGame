// components/alphabet.tsx
import React from 'react';

interface LetterProps {
  clickedLetters: string[];
  handleLetterClick: (letter: string) => void;
  disabled?: boolean;
}

const Letters: React.FC<LetterProps> = ({ clickedLetters, handleLetterClick, disabled }) => {
  const letters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className='inline-block'>
      <div className='grid grid-cols-6 grid-rows-5 w-[500px] h-[300px]'>
        {letters.map((letter, index) => (
          <label
            key={index}
            className={`p-3 bg-slate-500 w-10 h-10 rounded-lg flex items-center justify-center
              hover:transition-transform duration-100 ${clickedLetters.includes(letter) ? 'bg-red-500 text-white' : 'bg-slate-500'}`}
            onClick={() => !disabled && !clickedLetters.includes(letter) && handleLetterClick(letter)} // Blokowanie kliknięcia
            style={{ pointerEvents: clickedLetters.includes(letter) || disabled ? 'none' : 'auto' }}
          >
            {letter}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Letters;