import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Rules from './Component/Rules';
import GameBoard from './Component/GameBoard';

const RulesRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/rules',
    element: <Rules />,
  },

  {
    path: '/game/normal',
    element: <GameBoard level={'normal'}></GameBoard>,
  },
  {
    path: '/game/hard',
    element: <GameBoard level={'hard'}></GameBoard>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={RulesRouter} />
  </React.StrictMode>
);
