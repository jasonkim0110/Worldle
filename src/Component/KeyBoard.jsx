import React from 'react';
import '../CSS/keyboardCSS.css';

const Keyboard = ({ handleLetterClick }) => {
  const letters = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  const renderKeyboard = () => {
    return letters.map((row, i) => {
      const rowLetters = row.split('');
      return (
        <div key={i} className="keyboard-row">
          {rowLetters.map((letter, j) => (
            <div
              key={`${i}-${j}`}
              className="keyboard-letter"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      );
    });
  };

  return <div className="keyboard">{renderKeyboard()}</div>;
};

export default Keyboard;
