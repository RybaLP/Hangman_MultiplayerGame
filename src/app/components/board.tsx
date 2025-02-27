import React from "react";

interface BoardProps{
  hashedPassword : string;
  guessedLetters: string[];
}

const Board : React.FC<BoardProps> = ({hashedPassword, guessedLetters}) => {
  return(
    <div className="text-4xl font-mono">
      {hashedPassword}
    </div>
  );
}


export default Board;