import React from 'react';
import '../CSS/gameCSS.css';
import KeyBoard from '../Component/KeyBoard';

const GameBoard = ({ level }) => {
  const numRows = level === 'normal' ? 6 : 5;
  const numCols = level === 'normal' ? 6 : 7;
  const numLetters = level === 'normal' ? 6 : 7;

  const handleLetterClick = (letter) => {
    console.log(`Clicked letter: ${letter}`);
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(
          <div key={`${i}-${j}`} className="board-square">
            {i < numLetters && <input type="text" maxLength="1" />}
          </div>
        );
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="game-board">
      <h2>{level.toUpperCase()} LEVEL</h2>
      <div className="board">{renderBoard()}</div>
      <KeyBoard onLetterClick={handleLetterClick} />
    </div>
  );
};

export default GameBoard;
