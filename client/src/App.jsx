import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './App.css';

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import SignOut from './components/SignOut';
import Home from './pages/Home/Home';
import NoMatch from './pages/404 not found/404-NotFound';
import UserProfile from './pages/UserProfile/UserProfile';
import Landing from './pages/Landing/Landing';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import DashLayout from './pages/Dashboard/Dashboard';
import MonthCard from './pages/Monthcard/MonthCard';
import CardsLibrary from './pages/MonthCardsLibrary/CardsLibrary';
import About from './pages/About/About';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <Router>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/" element={<DashLayout auth={isAuth} />}>
          <Route path="*" element={<NoMatch />} />
          <Route path="/about" element={<About />} />
          {/**PROTECTED ROUTES */}
          <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signout"
            element={
              <ProtectedRoute>
                <SignOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:userId/:cardId"
            element={
              <ProtectedRoute>
                <MonthCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:userId/cards"
            element={
              <ProtectedRoute>
                <CardsLibrary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:userId/settings"
            element={
              <ProtectedRoute>
                <NoMatch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/privacy"
            element={
              <ProtectedRoute>
                <NoMatch />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
