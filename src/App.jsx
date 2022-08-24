import React, { useEffect, useState } from "react";
// import Intro from "./Intro";
// import Question from "./Question";

export default function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [intro, setIntro] = useState(true);

  // Hard code questions out to get some pictures
  const question = allQuestions.map((q) => {
    const question = q.question;
    const objChoices = q.incorrect_answers + "," + q.correct_answer;
    const realChoices = objChoices.split(",");
    console.log(realChoices);
    return (
      <div>
        <p>{question}</p>
        <div className="choices-div">
          <div className="choice">{realChoices[0]}</div>
          <div className="choice">{realChoices[1]}</div>
          <div className="choice">{realChoices[2]}</div>
          <div className="choice">{realChoices[3]}</div>
        </div>
      </div>
    );
  });
  //console.log(allQuestions)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setAllQuestions(data.results));
  }, []);

  function startQuiz() {
    setIntro((prevIntro) => !prevIntro);
    console.log("startQuiz");
  }

  // map through allQuestions and generate question and choices
  // into question

  return (
    <main>
      <div className="container">{question}</div>
    </main>
  );
}

// { intro ?
//   <Intro
//     startQuiz={startQuiz}
//   /> :
//   sth
// }
