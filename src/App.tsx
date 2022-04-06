import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from './components/Navigation';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import User from './components/User';
import RatingList from './components/RatingList'
import CreateRating from './components/CreateRating';
import Rating from './components/Rating';

function App(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/edit/:userName" element={<User/>} />
        <Route path="/add" element={<CreateUser/>} />
        <Route path="/ratings" element={<RatingList/>} />
        <Route path="/ratings/add" element={<CreateRating/>} />
        <Route path="/ratings/edit/:ratingName" element={<Rating/>} />
      </Routes>
    </Router>
  );
}

export default App;
