import { useState, useEffect } from "react"
import { Modal } from "../components/Modal"

export const StartModal = ({ onSelectParams, setShowIntro, onClose }) => {
  const [categories, setCategories] = useState([])
  const [params, setParams] = useState({
    amount: 5,
    type: "multiple",
    category: null,
    difficulty: "easy",
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

  const handleChange = (event) => {
    setParams({ ...params, amount: event.target.value })
  }

  const handleClose = () => {
    onClose()
    setShowIntro(false)
  }

  return (
    <Modal>
      <div className='flex flex-col w-full'>
        <h2 className='text-xl font-semibold'>Choose your question</h2>
        <p className='text-gray-500 mt-1'>Whatever you want, buddy </p>
      </div>

      <h3 className='text-lg font-medium'>Difficulties: </h3>
      <div className='grid grid-cols-3 gap-x-2.5'>
        <button
          className={`${
            params.difficulty === "easy" ? "bg-bg-text" : "bg-slate-50"
          } text-text-blue hover:bg-bg-text rounded-xl p-1.5 cursor-pointer`}
          onClick={() => setParams({ ...params, difficulty: "easy" })}
        >
          Easy
        </button>
        <button
          className={`${
            params.difficulty === "medium" ? "bg-bg-text" : "bg-slate-50"
          } text-text-blue hover:bg-bg-text rounded-xl p-1.5 cursor-pointer`}
          onClick={() => setParams({ ...params, difficulty: "medium" })}
        >
          Medium
        </button>
        <button
          className={`${
            params.difficulty === "hard" ? "bg-bg-text" : "bg-slate-50"
          } text-text-blue hover:bg-bg-text rounded-xl p-1.5 cursor-pointer`}
          onClick={() => setParams({ ...params, difficulty: "hard" })}
        >
          Hard
        </button>
      </div>

      <h3 className='text-lg font-medium'>Choose amount of questions: </h3>
      <div>
        <select
          id='questions'
          className='w-full bg-slate-50 border text-text-blue text-1 rounded-lg block p-1'
          value={params.amount}
          onChange={handleChange}
        >
          <option value='5' align='center' selected>
            5
          </option>
          <option value='10' align='center'>
            10
          </option>
          <option value='15' align='center'>
            15
          </option>
          <option value='20' align='center'>
            20
          </option>
        </select>
      </div>

      <h3 className='text-lg font-medium'>Category: </h3>
      <div className='flex gap-2 flex-wrap'>
        {categories ? (
          categories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category, index) => (
              <div
                key={index}
                className={`${
                  params.category === category.id ? "bg-bg-text" : "bg-slate-50"
                } text-text-blue hover:bg-slate-200 rounded-xl p-2 cursor-pointer`}
                onClick={() => {
                  console.log(category.name)
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
      <div className='flex gap-x-4 ml-auto mt-2'>
        <button
          className='flex-1 bg-slate-200 hover:bg-slate-300 font-semibold py-2 px-4 rounded-lg'
          onClick={() => onClose()}
        >
          Back
        </button>
        <button
          className='flex-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg'
          onClick={handleClose}
        >
          Start
        </button>
      </div>
    </Modal>
  )
}
