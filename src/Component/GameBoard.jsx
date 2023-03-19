import React, { useState } from 'react';
import '../CSS/gameCSS.css';
import KeyBoard from '../Component/KeyBoard';

const GameBoard = ({ level }) => {
  const numRows = level === 'normal' ? 6 : 5;
  const numCols = level === 'normal' ? 6 : 7;
  const numLetters = level === 'normal' ? 6 : 7;

  const [inputValues, setInputValues] = useState(Array(numLetters).fill(''));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  const isCurrentRow = (i) => i === currentRow;

  const handleLetterClick = (letter) => {
    if (letter === 'Delete') {
      // Delete the last letter entered
      if (currentCol > 0) {
        const newValues = [...inputValues];
        const index = currentRow * numCols + currentCol - 1;
        newValues[index] = '';
        setInputValues(newValues);
        setCurrentCol(currentCol - 1);
      }
    } else if (letter === 'Enter') {
      // Move to the first square of the next row
      if (currentRow < numRows - 1) {
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);
      }
    } else {
      // Fill the next empty input with the clicked letter (only for first row)
      if (currentRow === 0) {
        const newValues = [...inputValues];
        const index = currentRow * numCols + currentCol;
        if (newValues[index] === '') {
          newValues[index] = letter;
          setInputValues(newValues);
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
    }
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        const index = i * numCols + j;
        const className = isCurrentRow(i)
          ? 'board-square current-row'
          : 'board-square';
        row.push(
          <div key={`${i}-${j}`} className={className}>
            {index < numLetters && (
              <input type="text" maxLength="1" value={inputValues[index]} />
            )}
          </div>
        );
      }
      board.push(
        <div
          key={i}
          className={`board-row ${isCurrentRow(i) ? 'current-row' : ''}`}
        >
          {row}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="game-board">
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
