import Choice from "./Choices";
import { decode } from "html-entities";
import { useEffect, useState } from "react";

const Question = ({ questionData, ansRevealed, setPoints, questions }) => {
  const [ansIndex, setAnsIndex] = useState(randomIndex());
  const [selectedAns, setSelectedAns] = useState("");
  const [choices, setChoices] = useState([]);

  function randomIndex() {
    return Math.floor(Math.random() * 4);
  }

  // reset id, position, selection after fetching new set of questions
  useEffect(() => {
    const allChoices = [...questionData.incorrect_answers];
    allChoices.splice(ansIndex, 0, `cA:${questionData.correct_answer}`);
    setChoices(
      allChoices.map((choice, i) => ({
        id: i,
        text: decode(choice),
        selected: false,
      }))
    );
    setAnsIndex(randomIndex());
    setSelectedAns("");
  }, [questions]);

  // count score
  useEffect(() => {
    ansRevealed &&
      ansIndex === selectedAns &&
      setPoints((prevPoint) => (prevPoint += 1));
  }, [ansRevealed]);

  const renderChoices = () => {
    return choices.map((choice) => (
      <Choice
        key={choice.id}
        choice={choice}
        ansRevealed={ansRevealed}
        selectedAns={selectedAns}
        setSelectedAns={setSelectedAns}
        ansIndex={ansIndex}
      />
    ));
  };

  console.log(ansIndex);

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
