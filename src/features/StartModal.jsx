import { useState, useEffect } from "react"
import { Modal } from "../components/Modal"

export const StartModal = ({ onSelectParams, setQuizzing, onClose }) => {
  const [categories, setCategories] = useState([])
  const [params, setParams] = useState({
    amount: 10,
    type: "multiple",
    category: null,
    difficulty: null,
  })

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("https://opentdb.com/api_category.php")
      try {
        if (response.ok) {
          const responseData = await response.json()
          // console.log("fetch complete")
          return responseData.trivia_categories
        }
        throw new Error("Something went wrong")
      } catch (err) {
        // do sth
        console.log(err)
      }
    }
    fetchCategories().then((res) => {
      setCategories(res)
    })
  }, [])

  useEffect(() => {
    let query = Object.keys(params)
      .filter((item) => params[item] !== null)
      .map((k) => {
        const key = encodeURIComponent(k)
        const value = encodeURIComponent(params[k])

        return `${key}=${value}`
      })
      .join("&")
    onSelectParams(query)
    // do sth with new query
  }, [params])

  const handleClose = () => {
    onClose()
    setQuizzing(true)
  }

  console.log(categories)

  return (
    <Modal>
      <div className='flex flex-col items-center'>
        <h2 className='text-xl font-semibold'>Choose a Catergory</h2>
        <p className='text-gray-500 mt-1'>Select your own catergory below </p>
      </div>

      {/* difficulty selector here */}
      <h3 className='text-lg font-medium'>Difficulties:</h3>
      <div>
        <span onClick={() => setParams({ ...params, difficulty: "easy" })}>
          easy
        </span>
        <span>medium</span>
        <span>hard</span>
      </div>

      {/* maybe add amount of questions here? */}
      <h3 className='text-lg font-medium'>Amount of questions:</h3>
      <p>add sth to choose from</p>

      <h3 className='text-lg font-medium'>Category:</h3>
      <div className='flex gap-2 flex-wrap mt-4'>
        {categories ? (
          categories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category, index) => (
              <div
                key={index}
                className={`${
                  params.category === category.id
                    ? "bg-slate-200"
                    : "bg-slate-50"
                } hover:bg-slate-200 rounded-xl p-2 cursor-pointer`}
                onClick={() => {
                  console.log("test")
                  setParams({ ...params, category: category.id })
                }}
              >
                <span className='text-sm'>{category.name}</span>
              </div>
            ))
        ) : (
          <span>Loading...</span>
        )}
      </div>

      <div className='flex gap-x-4 ml-auto'>
        <button className='flex-1' onClick={() => onClose()}>
          Back
        </button>
        <button
          className='flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleClose}
        >
          Start
        </button>
      </div>
    </Modal>
  )
}
