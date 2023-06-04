import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { SuperheroesPage } from './pages/SuperheroesPage';
import { SuperheroPage } from './pages/SuperheroPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SuperheroesPage />} />

        <Route path="/superhero/:id" element={<SuperheroPage />} />
      </Routes>
    </div>
  );
}

export default App;
