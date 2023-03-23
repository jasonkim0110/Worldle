import React, { useState, useEffect } from 'react';
import '../CSS/gameCSS.css';
import KeyBoard from '../Component/KeyBoard';
import App from '../App';

const GameBoard = ({ level }) => {
  const numRows = level === 'normal' ? 6 : 5;
  const numCols = level === 'normal' ? 6 : 7;
  const numLetters = level === 'normal' ? 6 : 7;
  const lastCol = level === 'normal' ? 5 : 6;
  const normalDictionary = ['banana'];

  const hardDictionary = [
    'bicycle',
    'chicken',
    'diamond',
    'elephant',
    'firefly',
    'gardenia',
    'happiness',
    'imagine',
    'jungle',
    'kangaroo',
  ];

  const [inputValues, setInputValues] = useState(
    Array(numRows * numCols).fill('')
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [disableInputs, setDisableInputs] = useState(false);
  const [highlightedLetters, setHighlightedLetters] = useState([]);

  const [guessWord, setGuessWord] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState('');

  useEffect(() => {
    const dictionary = level === 'normal' ? normalDictionary : hardDictionary;
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    setGuessWord(dictionary[randomIndex]);
  }, [level]);

  const [message, setMessage] = useState('');

  const getColor = (letter, index, row) => {
    if (!guessWord.includes(letter)) {
      return 'gray';
    } else if (row < currentRow && guessWord[index] === letter) {
      return 'green';
    } else {
      return 'yellow';
    }
  };

  const handleLetterClick = (letter) => {
    if (letter === 'Delete') {
      // Delete the last non-empty input in the current row
      const newValues = [...inputValues];
      let index;
      for (let i = numCols - 1; i >= 0; i--) {
        index = currentRow * numCols + i;
        if (newValues[index] !== '') {
          newValues[index] = '';
          setInputValues(newValues);
          setCurrentCol(i);
          break;
        }
      }
    } else if (letter === 'Enter') {
      if (
        currentAttempt.length < guessWord.length ||
        currentAttempt.length > guessWord.length
      ) {
        setMessage('Word length must be ' + guessWord.length);
      } else {
        if (currentAttempt === guessWord) {
          setMessage('Congratulations!');
          let newValues = [...inputValues];
          let highlightedLetters = [];
          for (let i = 0; i < guessWord.length; i++) {
            newValues[currentRow * numCols + i] = currentAttempt[i];
            highlightedLetters.push(i);
          }
          setInputValues(newValues);
          setDisableInputs(true);
          setHighlightedLetters(highlightedLetters);
          return;
        } else {
          let newValues = [...inputValues];
          let highlightedLetters = [];
          for (let i = 0; i < guessWord.length; i++) {
            const color = getColor(currentAttempt[i], i);
            newValues[currentRow * numCols + i] = currentAttempt[i];
            if (color === 'green') {
              highlightedLetters.push(i);
            }
          }
          setInputValues(newValues);
          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
          setCurrentAttempt('');
          if (currentRow === numRows - 1 || currentAttempt === guessWord) {
            setDisableInputs(true);
          }
          setHighlightedLetters(highlightedLetters);
        }
      }
    } else if (letter === 'Reset') {
      // Reset the game
      setInputValues(Array(numRows * numCols).fill(''));
      setCurrentRow(0);
      setCurrentCol(0);
      setDisableInputs(false);
      setMessage('');
      setHighlightedLetters([]);
      const dictionary = level === 'normal' ? normalDictionary : hardDictionary;
      const randomIndex = Math.floor(Math.random() * dictionary.length);
      setGuessWord(dictionary[randomIndex]);
    } else {
      // Fill the next empty input with the clicked letter (only for current row)
      const newValues = [...inputValues];
      const index = currentRow * numCols + currentCol;
      if (newValues[index] === '' && currentRow < numRows) {
        newValues[index] = letter;
        setInputValues(newValues);
        setCurrentAttempt(currentAttempt + letter);
        if (currentCol === numCols - 1) {
          // If we're at the end of the row, move to the next row
          if (currentRow === numRows - 1) {
            // If we're at the last row, disable input
            const inputs = document.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
              inputs[i].disabled = true;
            }
          }
        } else {
          setCurrentCol(currentCol + 1);
        }
      }
    }
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        const index = i * numCols + j;
        const inputValue = inputValues[index];
        const isCurrent = i === currentRow && j === currentCol;
        const isDisabled =
          disableInputs || i > currentRow || (i === currentRow && j > lastCol);

        const backgroundColor =
          i < currentRow || disableInputs
            ? getColor(inputValue, j, i)
            : 'transparent';

        const isCorrect = guessWord[j] === inputValue;
        const inputClassName = isCorrect ? 'correct' : '';

        row.push(
          <div
            key={index}
            className={`board-square ${isCurrent ? 'current-square' : ''}`}
            style={{ backgroundColor: backgroundColor }}
          >
            {!disableInputs && isCurrent && (
              <input
                type="text"
                maxLength="1"
                value={inputValue}
                className={inputClassName}
                style={{ backgroundColor: backgroundColor }}
                onChange={(event) => handleLetterClick(event.target.value)}
              />
            )}
            {!disableInputs && !isCurrent && inputValue && (
              <div className={`letter ${inputClassName}`}>{inputValue}</div>
            )}
            {disableInputs && inputValue && (
              <div className={`letter ${inputClassName}`}>{inputValue}</div>
            )}
          </div>
        );
      }
      board.push(
        <div
          key={i}
          className={`board-row ${i === currentRow ? 'current-row' : ''}`}
        >
          {row}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="game-board">
      {message && <div className="message">{message}</div>}
      <h2>{level.toUpperCase()} LEVEL</h2>
      <div className="board">
        {renderBoard()}
        <div className="keyboard-container">
          <KeyBoard onLetterClick={handleLetterClick} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
