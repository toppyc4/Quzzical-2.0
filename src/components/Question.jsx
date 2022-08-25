import Choice from "./Choices";
import { decode } from "html-entities";
import { useEffect, useState } from "react";

const Question = ({ questionData, ansRevealed, points }) => {
  const [ansIndex, setAnsIndex] = useState(randomIndex());
  const [selectedAns, setSelectedAns] = useState("");
  const [choices, setChoices] = useState([]);

  function randomIndex() {
    return Math.floor(Math.random() * 4);
  }

  useEffect(() => {
    const allChoices = [...questionData.incorrect_answers];
    allChoices.splice(ansIndex, 0, questionData.correct_answer);
    setChoices(
      allChoices.map((choice, i) => ({
        id: i,
        text: decode(choice),
        selected: false,
      }))
    );
  }, []);

  const renderChoices = () => {
    return choices.map((choice) => (
      <Choice
        key={choice.id}
        choice={choice}
        ansRevealed={ansRevealed}
        selectedAns={selectedAns}
        setSelectedAns={setSelectedAns}
        ansIndex={ansIndex}
        points={points}
      />
    ));
  };

  return (
    <div className=" min-w-full flex flex-col gap-4 border-b-2 pb-4 border-b-stroke lg:gap-6 lg:pb-6">
      <p className="text-md font-karla text-text-blue md:text-xl lg:text-2xl">
        {decode(questionData.question)}
      </p>
      <div className="flex flex-row gap-4 lg:gap-8">{renderChoices()}</div>
    </div>
  );
};

export default Question;

// felx flex-wrap
