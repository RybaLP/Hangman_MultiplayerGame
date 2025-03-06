// components/alphabet.tsx
import React from 'react';


interface LetterProps {
  guessedLetters : string[];
  clickedLetters: string[];
  handleLetterClick: (letter: string) => void;
  disabled?: boolean;
}

const Letters: React.FC<LetterProps> = ({ clickedLetters, handleLetterClick, disabled , guessedLetters}) => {
  const letters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const changeStyleOfLetter = (letter : string) => {
    if (guessedLetters.includes(letter)){
      return 'p-3 w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center';
    } 
    if (clickedLetters.includes(letter)) {
      return 'p-3 w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center';
    }
    return 'p-3 w-10 h-10 rounded-lg bg-slate-500 flex items-center justify-center';
  }

  return (
    <div className='inline-block'>
      <div className='grid grid-cols-6 grid-rows-5 w-[500px] h-[300px]'>
        {letters.map((letter, index) => (
          <label
            key={index}
            className={`${changeStyleOfLetter(letter)} hover:transition-transform duration-100 cursor-pointer`}
            onClick={() => !disabled && !clickedLetters.includes(letter) && handleLetterClick(letter)}
            style={{ pointerEvents: clickedLetters.includes(letter) || disabled ? 'none' : 'auto' }}
          >
            {letter}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Letters