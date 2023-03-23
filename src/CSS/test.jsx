import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './CSS/App.css';
import GameBoard from './Component/GameBoard';
import Rules from './Component/Rules';
import './CSS/RulesCSS.css';

function App() {
  const [level, setLevel] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const handleLevelSelection = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  const handleToggleRules = () => {
    setShowRules((prevValue) => !prevValue);
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <h1>Wordle</h1>
        </nav>
        <Route path="/rules" component={Rules} />
        <Route path="/game/normal">
          <GameBoard level="normal" />
        </Route>
        <Route path="/game/hard">
          <GameBoard level="hard" />
        </Route>
        {!level && (
          <div className="level-selection">
            <h2>Select Difficulty Level:</h2>
            <div>
              <button onClick={() => handleLevelSelection('normal')}>
                Normal
              </button>
              <button onClick={() => handleLevelSelection('hard')}>Hard</button>
            </div>
            <p></p>
            <button onClick={handleToggleRules}>Rules</button>
          </div>
        )}
      </Router>
      {showRules && <Rules />}
    </div>
  );
}

export default App;
