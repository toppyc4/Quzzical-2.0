import { useState, useEffect } from "react"
import Question from "./Question"

const Questions = ({ url }) => {
  const [questions, setQuestions] = useState([])
  const [isGAMEOVER, setIsGAMEOVER] = useState(false)
  const [points, setPoints] = useState(0)
  const [scoreText, setScoreText] = useState("")
  const [answeredIndex, setAnsweredIndex] = useState(0)

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((jsonData) => setQuestions(jsonData.results))
  }, [])

  useEffect(() => {
    setScoreText(
      `Nice, you scored ${points}/${questions.length} correct answer(s)`
    )
  }, [points])

  async function fetchData() {
    const response = await fetch(url)
    try {
      if (response.ok) {
        const jsonData = await response.json()
        return jsonData.results
      }
      throw new Error("Something went Wrong, 🥺")
    } catch (err) {
      // do sth, wat2do?
      console.log(err)
      // console.log(answeredIndex)
    }
  }

  // const getQuestionsFromServer = () => {
  //   fetch("https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy")
  //     .then((data) => data.json())
  //     .then((jsonData) => setQuestions(jsonData.results));
  // };

  const questionsEl = questions.map((question, i) => (
    <Question
      key={i}
      questionData={question}
      questions={questions}
      setPoints={setPoints}
      setAnsweredIndex={setAnsweredIndex}
      isGAMEOVER={isGAMEOVER}
    />
  ))

  const newGame = () => {
    fetchData().then((response) => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setQuestions(response)
      setIsGAMEOVER(false)
      setAnsweredIndex(0)
      setPoints(0)
    })
    // getQuestionsFromServer();
  }

  function handleSubmit() {
    answeredIndex === questions.length && setIsGAMEOVER(true)
  }

  return (
    <div className='z-10 h-full max-w-6xl flex flex-col justify-center items-start gap-3 p-8 sm:px-16 lg:gap-8 lg:py-16'>
      {questions?.length ? (
        questionsEl
      ) : (
        <p className='text-md font-karla text-text-blue md:text-xl lg:text-2xl self-center'>
          Loading Quiz...
        </p>
      )}
      <div className='flex flex-col items-center justify-center w-full gap-4 mt-4 md:flex-row md:gap-8'>
        <p className='text-md font-karla text-text-blue md:text-xl lg:text-2xl'>
          {isGAMEOVER && scoreText}
        </p>

        {questions?.length > 0 && (
          <>
            {isGAMEOVER ? (
              <button
                className='self-center text-white bg-btn-blue font-inter px-6 py-2 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg'
                onClick={newGame}
              >
                Play again
              </button>
            ) : answeredIndex < 10 ? (
              <p className='text-md font-karla text-text-blue md:text-xl lg:text-2xl'>
                Choose the remaining {questions.length - answeredIndex}{" "}
                question(s)
              </p>
            ) : (
              <button
                className='self-center text-white bg-btn-blue font-inter px-6 py-2 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg'
                onClick={handleSubmit}
                disabled={answeredIndex < 10}
              >
                Check Answers
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Questions
