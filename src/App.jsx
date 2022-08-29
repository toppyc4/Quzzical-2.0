import { useState } from "react"
import Intro from "./components/Intro"
import { Portal } from "./components/Modal"
import { StartModal } from "./features"
import Questions from "./components/Questions"
import topBlob from "./imgs/topBlob.svg"
import bottomBlob from "./imgs/bottomBlob.svg"

const App = () => {
  const Base_URL = "https://opentdb.com/api.php?"

  const [url, setUrl] = useState(Base_URL)
  const [quizzing, setQuizzing] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleChangeUrl = (params) => setUrl(Base_URL + params)

  return (
    <div className='min-h-screen flex items-center justify-center bg-bg-blue relative overflow-hidden'>
      <img
        src={topBlob}
        className='pointer-events-none absolute top-0 right-0 -rotate-12 translate-x-1/2 -translate-y-1/2 sm:scale-50'
        alt='yellow blob'
      />
      <img
        src={bottomBlob}
        className='pointer-events-none absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 sm:scale-50'
        alt='blue blob'
      />
      {quizzing ? (
        <Questions url={url} />
      ) : (
        <Intro setShowModal={setShowModal} />
      )}

      {showModal && (
        <Portal
          className='portal'
          onClick={() => setShowModal((prev) => !prev)}
        />
      )}

      {showModal && (
        <StartModal
          onClose={() => setShowModal(false)}
          onSelectParams={handleChangeUrl}
          setQuizzing={setQuizzing}
        />
      )}
    </div>
  )
}

export default App
