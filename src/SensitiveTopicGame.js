import React, { useState, useEffect, useCallback } from "react";
import questions from "./questions.json";
import GameOver from "./GameOver";
import GameInProgress from "./GameInProgress";
import "./styles.css"; // Import the stylesheet

const SensitiveTopicGame = () => {
  // Use the useState hook to define and update state variables
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // Use the useCallback hook to create a memoized version of the handleNextQuestion function
  const handleNextQuestion = useCallback(() => {
    const nextQuestionIndex = questions.indexOf(currentQuestion) + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(questions[nextQuestionIndex]);
    } else {
      setGameOver(true);
    }
  }, [currentQuestion, setCurrentQuestion]);

  // Use the useEffect hook to run a callback function when the component is mounted
  useEffect(() => {
    // Set a timer to decrease the value of the timer state variable every second
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    // Check if the timer has reached 0 and move to the next question if it has
    if (timer === 0) {
      setTimer(30); // Reset the timer to 30 seconds
      handleNextQuestion();
    }

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [timer, handleNextQuestion]);

  const handleAnswerSelected = (event, answer) => {
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    handleNextQuestion();
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(questions[0]);
    setScore(0);
    setTimer(30);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Sensitive Topic History Quiz</h1>
      {gameOver ? (
        <GameOver score={score} handlePlayAgain={handlePlayAgain} />
      ) : (
        <GameInProgress
          currentQuestion={currentQuestion}
          handleAnswerSelected={handleAnswerSelected}
          score={score}
          timer={timer}
        />
      )}
    </div>
  );
};

export default SensitiveTopicGame;
