import { useState, useEffect } from "react";
import Question from "./Question";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isGAMEOVER, setIsGAMEOVER] = useState(false);
  const [scoreText, setScoreText] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetchData();
    // getQuestionsFromServer();
  }, []);

  useEffect(() => {
    setScoreText(`Nice, you scored ${points}/5 correct answers`);
  }, [points]);

  async function fetchData() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy"
    );
    const data = await res.json();

    setQuestions(data.results);
  }

  // const getQuestionsFromServer = () => {
  //   fetch("https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy")
  //     .then((data) => data.json())
  //     .then((jsonData) => setQuestions(jsonData.results));
  // };

  const renderQuestions = () => {
    return questions.map((question, i) => (
      <Question
        key={i}
        questionData={question}
        isGAMEOVER={isGAMEOVER}
        setPoints={setPoints}
        questions={questions}
      />
    ));
  };

  const newGame = () => {
    fetchData();
    // getQuestionsFromServer();
    setIsGAMEOVER(false);
    setPoints(0);
    setScoreText("");
  };

  return (
    <div className="z-10 h-full max-w-6xl flex flex-col justify-center items-start gap-3 p-8 sm:px-16 lg:gap-8 lg:py-16">
      {questions.length ? (
        renderQuestions()
      ) : (
        <p className="text-md font-karla text-text-blue md:text-xl lg:text-2xl self-center">
          Loading Quiz...
        </p>
      )}
      <div className="flex flex-col items-center justify-center w-full gap-4 mt-4 md:flex-row md:gap-8">
        <p className="text-md font-karla text-text-blue md:text-xl lg:text-2xl">
          {isGAMEOVER && scoreText}
        </p>
      </div>
      {!isGAMEOVER ? (
        <button
          className="self-center text-white bg-btn-blue font-inter px-6 py-2 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg"
          onClick={() => setIsGAMEOVER(true)}
        >
          Check Answers
        </button>
      ) : (
        <button
          className="self-center text-white bg-btn-blue font-inter px-6 py-2 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg"
          onClick={newGame}
        >
          Play again
        </button>
      )}
    </div>
  );
};

export default Questions;
