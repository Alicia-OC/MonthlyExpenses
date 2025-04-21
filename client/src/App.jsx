import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.css';

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import NoMatch from './pages/404 not found/404-NotFound';

import DashLayout from './pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {' '}
        <Route path="*" element={<NoMatch />} />{' '}
        <Route path="/" element={<DashLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
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
