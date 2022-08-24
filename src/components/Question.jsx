import Choice from "./Choices";
import { decode } from "html-entities";

const Question = ({ questionData }) => {
  const randomIndex = () => {
    return Math.floor(Math.random() * 4);
  };

  const renderChoices = () => {
    const ansIndex = randomIndex();
    const choices = [...questionData.incorrect_answers];
    choices.splice(ansIndex, 0, questionData.correct_answer);
    return choices.map((choice, i) => (
      <Choice choice={decode(choice)} key={i} />
    ));
  };

  return (
    <div className="flex flex-col gap-4 border-b-2 pb-4 max-w-7xl border-b-stroke">
      <p className="text-xl font-karla text-text-blue">
        {decode(questionData.question)}
      </p>
      <div className="flex gap-4">{renderChoices()}</div>
    </div>
  );
};

export default Question;
