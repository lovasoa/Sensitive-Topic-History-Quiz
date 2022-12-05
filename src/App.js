import React, { useState } from "react";
import GameIntro from "./GameIntro";
import SensitiveTopicGame from "./SensitiveTopicGame";

const App = () => {
  // Use the useState hook to define and update the gameStarted state variable
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div>
      {gameStarted ? (
        <SensitiveTopicGame />
      ) : (
        <GameIntro handleStartGame={() => setGameStarted(true)} />
      )}
    </div>
  );
};

export default App;
