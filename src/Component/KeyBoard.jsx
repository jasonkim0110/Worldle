import React from 'react';
import '../CSS/keyboardCSS.css';

const KeyBoard = ({ onLetterClick }) => {
  const letters = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  const handleDeleteClick = () => {
    onLetterClick('Delete');
  };

  const renderKeyboard = () => {
    return letters.map((row, i) => {
      const rowLetters = row.split('');
      return (
        <div key={i} className="keyboard-row">
          {i === 2 && (
            <>
              <button
                key={`${i}-back`}
                className="keyboard-letter-Back"
                onClick={() => onLetterClick('Back')}
              >
                Back
              </button>
              <button
                key={`${i}-delete`}
                className="keyboard-letter-Delete "
                onClick={() => handleDeleteClick('Delete')}
              >
                Del
              </button>
            </>
          )}
          {rowLetters.map((letter, j) => (
            <button
              key={`${i}-${j}`}
              className="keyboard-letter keyboard-key"
              onClick={() => onLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
          {i === letters.length - 1 && (
            <button
              key={`${i}-enter`}
              className="keyboard-letter-Enter"
              onClick={() => onLetterClick('Enter')}
            >
              Enter
            </button>
          )}
        </div>
      );
    });
  };

  return <div className="keyboard">{renderKeyboard()}</div>;
};

export default KeyBoard;
