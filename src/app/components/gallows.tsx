import React from "react";

interface GallowsProps {
    incorrectAttempts : number;
}

const Gallows : React.FC<GallowsProps> = ({incorrectAttempts}) => {
   const imageSrc = `/s${incorrectAttempts}.jpg`;

   return(
    <div className="w-[400px] h-[100px]">
      <img width={'400px'} src={imageSrc} alt={`Szubienica ${incorrectAttempts}/9`} />
    </div>
   );
}

export default Gallows;