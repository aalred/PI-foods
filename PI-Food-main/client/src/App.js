import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
// Routes:
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage';
import DetailRecipe from './components/DetailRecipe';
import CreateRecipe from './components/CreateRecipe';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path={"/"} element={<LandingPage />} />
        <Route exact path={"/detail/:id"} element={<DetailRecipe />} />
        <Route path={"/main"} element={<MainPage />} />
        <Route path={"/creatRecipe"} element={<CreateRecipe />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
