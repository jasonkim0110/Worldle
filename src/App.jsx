import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './CSS/App.css';
import GameBoard from './Component/GameBoard';
import Rules from './Component/Rules';
import './CSS/RulesCSS.css';

function App() {
  const [level, setLevel] = useState(null);
  const handleLevelSelection = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
        {level && <h2>{level.toUpperCase()} LEVEL</h2>}
      </nav>
      {level ? (
        <GameBoard level={level}></GameBoard>
      ) : (
        <div className="level-selection">
          <h2>Select Difficulty Level:</h2>
          <div>
            <Link to={'/game/normal'}>Normal</Link>
            <p></p>
            <Link to={'/game/hard'}>Hard</Link>
          </div>
          <p></p>
          <Link to={'/rules'}>Rules</Link>
        </div>
      )}
    </div>
  );
}

export default App;
