import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.css';

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import SignOut from './components/SignOut';
import Home from './pages/Home/Home';
import NoMatch from './pages/404 not found/404-NotFound';
import UserProfile from './pages/UserProfile/UserProfile';

import DashLayout from './pages/Dashboard/Dashboard';
import MonthCard from './pages/Monthcard/MonthCard';
import CardsLibrary from './pages/MonthCardsLibrary/CardsLibrary';
import About from './pages/About/About';

function App() {
  return (
    <Router>
      <Routes>
        {' '}
        <Route path="*" element={<NoMatch />} />{' '}
        <Route path="/" element={<DashLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />{' '}

          <Route path="/signup" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignOut" element={<SignOut />} />
          <Route path="/:userId" element={<UserProfile />} />
          <Route path="/:userId/settings" element={<NoMatch />} />
          <Route path="/:userId/cards" element={<CardsLibrary />} />
          <Route path="/:userId/not found" element={<NoMatch />} />
          <Route path="/:userId/:cardId" element={<MonthCard />} />
          <Route
            path="/RegistrationSucceeded"
            element={<div>Registro exitoso</div>}
          />{' '}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
