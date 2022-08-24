import React from "react";

export default function Intro(props) {
  return (
    <div className="intro-div">
      <h1>Quizzical</h1>
      <span>Some description if needed</span>
      <br />
      <button onClick={props.startQuiz}>Start quiz</button>
    </div>
  );
}

// <img src='../Images/blob1.svg' className='blue-blob'/>
// <img src='../Images/blob2.svg' className='yellow-blob'/>
