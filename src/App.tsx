import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/home/HomePage';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { CreatePost } from './pages/create-post/CreatePost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ <HomePage />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/createpost' element={ <CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
