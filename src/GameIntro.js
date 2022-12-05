import React from "react";
import "./styles.css"; // Import the stylesheet

const GameIntro = ({ handleStartGame }) => (
  <div className="game-container">
    <h1>Welcome to the Sensitive Topic History Quiz!</h1>
    <p>
      In this game, you will be asked a series of questions about sensitive
      topics in history. All of the questions and answers have been carefully
      crafted by an AI, so you can trust that they are completely accurate and
      unbiased.
    </p>
    <p>
      To play the game, simply select the answer that you think is correct by
      clicking on it or by pressing the number key on your keyboard that
      corresponds to the answer. Be careful, because you have 30 seconds to
      answer as many questions as possible!
    </p>
    <button onClick={handleStartGame}>Start the game</button>
  </div>
);

export default GameIntro;
