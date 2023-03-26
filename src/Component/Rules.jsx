import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Rules = () => {
  return (
    <div>
      <h1>Rules</h1>
      <p>Here are the rules of the game:</p>
      <ul>
        <li>
          Guess the secret word in 6 or 7 attempts, depending on the level
          selected.
        </li>
        <li>The secret word is a 6 or 7 letter English word.</li>
        <li>Enter your guess by clicking on the letters on the keyboard.</li>
        <li>
          The letters in the word will be highlighted in yellow if they are
          correct and in red if they are incorrect.
        </li>
        <li>
          You can only enter one letter per input field, and you cannot use the
          same letter more than once in a single guess.
        </li>
        <li>Good luck!</li>
      </ul>
      <Link to="/">Back to Main</Link>
    </div>
  );
};

export default Rules;
