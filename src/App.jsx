import { useState } from 'react'
import HomePage from './pages/HomePage/HomePage'
import { Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';

function App(){
  return (
    <>
      <NavBar/>
      <div className='container'>
        <Routes>
          <Route path='/'/>
          <Route path='/services'/>
          <Route path='about'/>
        </Routes>
      </div>
    </>
  );
};

export default App
