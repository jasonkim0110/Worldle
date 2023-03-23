import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Rules from './Component/Rules';

const RulesRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/rules',
    element: <Rules />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={RulesRouter} />
  </React.StrictMode>
);
