import { useState } from 'react';
import './CSS/App.css';
// import { Route, Switch, Link } from 'react-router-dom';
import GameBoard from './Component/GameBoard';
import Rules from './Component/Rules';
import './CSS/RulesCSS.css';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [level, setLevel] = useState(null);
  const handleLevelSelection = (selectedLevel) => {
    setLevel(selectedLevel);
  };
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      {level ? (
        <GameBoard level={level}></GameBoard>
      ) : (
        <div className="level-selection">
          <h2>Select Difficulty Level:</h2>
          <div>
            <button onClick={() => handleLevelSelection('normal')}>
              Normal
            </button>
            <button onClick={() => handleLevelSelection('hard')}>Hard</button>
          </div>
          <p></p>
          <button onClick={() => Rules}>Rules</button>
        </div>
      )}
    </div>
  );
}

export default App;
