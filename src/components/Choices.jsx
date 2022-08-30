import { useState, useEffect } from "react"

const Choices = ({
  choice,
  selectedChoice,
  setSelectedChoice,
  isGAMEOVER,
  ans,
  handleFirstClick,
}) => {
  let styles = "border-btn-blue"

  if (!isGAMEOVER && selectedChoice === choice.text) {
    styles = "bg-bg-text border-bg-text"
  } else if (isGAMEOVER && choice.text === ans) {
    styles = "border-correct-green bg-correct-green"
  } else if (isGAMEOVER && choice.text === selectedChoice) {
    styles = "border-wrong-red bg-wrong-red opacity-60"
  } else if (isGAMEOVER) {
    styles = "border-btn-blue opacity-60"
  }

  const handleSelectChoice = () => {
    !isGAMEOVER && setSelectedChoice(choice.text)
    handleFirstClick()
  }

  return (
    <button
      className={`text-sm text-text-blue border-2 min-w-fit rounded-lg py-2 px-2 md:text-lg lg:text-lg lg:px-8 lg:rounded-x1 transition-colors ${
        !isGAMEOVER
          ? "hover:bg-bg-text focus:bg-bg-text focus:outline-none"
          : ""
      } ${styles}`}
      onClick={handleSelectChoice}
    >
      {choice.text}
    </button>
  )
}

export default Choices
