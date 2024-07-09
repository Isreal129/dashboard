// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Social Media App</h1>
      <a href="/posts">View Posts</a>
    </div>
  );
};

export default App;
