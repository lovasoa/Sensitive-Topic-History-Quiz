import React, { useState, useEffect } from "react";
import "./GameInProgress.css";

const GameInProgress = ({
  currentQuestion,
  handleAnswerSelected,
  score,
  timer
}) => {
  const [clicked, setClicked] = useState(false);

  // Add a new state variable to store the user's selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Create a new function that contains the logic for displaying the answers on the buttons
  const handleAnswerClick = (answer) => {
    setClicked(true);
    setTimeout(() => {
      handleAnswerSelected(event, answer);
      setClicked(false);
    }, 100);
  };

  // Add an event listener that listens for keypress events
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Convert the key that was pressed to a number (if possible)
      const key = parseInt(event.key, 10);

      // If the key that was pressed is a number and is within the range of available answers,
      // update the selectedAnswer state variable with the corresponding answer and call the
      // handleAnswerClick function to display the answers on the buttons
      if (!isNaN(key) && key > 0 && key <= currentQuestion.answers.length) {
        const answer = currentQuestion.answers[key - 1];
        setSelectedAnswer(answer);
        handleAnswerClick(answer);
      }
    };

    // Add the event listener
    document.addEventListener("keypress", handleKeyPress);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  return (
    <div className="game-container">
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.answers.map((answer, index) => (
        <button
          key={index}
          className={
            clicked && answer === currentQuestion.correctAnswer
              ? "correct-answer"
              : clicked && answer !== currentQuestion.correctAnswer
              ? "incorrect-answer"
              : ""
          }
          // Call the handleAnswerClick function when the button is clicked
          onClick={() => handleAnswerClick(answer)}
          value={answer}
        >
          {answer}
        </button>
      ))}
      <p>Your current score is: {score}</p>
      <p>Time remaining: {timer} seconds</p>
    </div>
  );
};

export default GameInProgress;
