import Choice from "./Choices"
import { decode } from "html-entities"
import { useEffect, useState } from "react"

const Question = ({
  questionData,
  isGAMEOVER,
  setPoints,
  questions,
  setAnsweredIndex,
}) => {
  const ans = questionData && decode(questionData.correct_answer)
  const [selectedChoice, setSelectedChoice] = useState("")
  const [choices, setChoices] = useState([])
  const [click, setClick] = useState(0)

  function randomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  function handleFirstClick() {
    if (click === 0) {
      setClick((state) => state + 1)
      setAnsweredIndex((state) => state + 1)
    }
  }

  // reset id, position, selection after fetching new set of questions
  useEffect(() => {
    if (!questionData) return
    const allChoices = [...questionData.incorrect_answers]
    allChoices.splice(
      randomIndex(questionData.incorrect_answers.length),
      0,
      questionData.correct_answer
    )
    setChoices(
      allChoices.map((choice, i) => ({
        id: i,
        text: decode(choice),
        selected: false,
      }))
    )
    setSelectedChoice("")
  }, [questions])

  // count score
  useEffect(() => {
    isGAMEOVER &&
      ans === selectedChoice &&
      setPoints((prevPoint) => (prevPoint += 1))
    setClick(0)
  }, [isGAMEOVER])

  const ChoicesEl = choices.map((choice) => (
    <Choice
      key={choice.id}
      choice={choice}
      isGAMEOVER={isGAMEOVER}
      selectedChoice={selectedChoice}
      setSelectedChoice={setSelectedChoice}
      handleFirstClick={handleFirstClick}
      ans={ans}
    />
  ))

  return (
    <div className=' min-w-full flex flex-col gap-4 border-b-2 pb-4 border-b-stroke lg:gap-6 lg:pb-6'>
      <p className='text-md font-karla text-text-blue md:text-xl lg:text-2xl'>
        {decode(questionData.question)}
      </p>
      <div className='flex flex-wrap gap-4 lg:gap-8'>{ChoicesEl}</div>
    </div>
  )
}

export default Question
