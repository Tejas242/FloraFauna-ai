import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import bg from './assets/Plant.jpg'
import Output from './components/Output';
import { Routes , Route } from 'react-router-dom'


function App() {
  const style = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <>
    <main className='h-screen w-screen' style={style}>
      <Header />
      <Routes>
        <Route path="*" element = {<Hero />}  />
        <Route path="output" element = {<Output />}  />
      </Routes>
      <Output/>
      <Footer/>
    </main>
    </>
  )
}

export default App