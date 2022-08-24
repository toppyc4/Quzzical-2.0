import React from "react";

export default function Intro(props) {
  return (
    <div className="h-full bg-bg-blue flex flex-col gap-4 items-center justify-center">
      <h1 className="text-text-blue font-karla text-3xl md:text-6xl">
        Quizzical
      </h1>
      <p className="text-text-blue font-inter md:text-xl">
        Some description if needed
      </p>
      <button className="text-white bg-btn-blue font-inter px-6 py-2 mt-4 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg">
        Start quiz
      </button>
    </div>
  );
}

// <img src='../Images/blob1.svg' className='blue-blob'/>
// <img src='../Images/blob2.svg' className='yellow-blob'/>
