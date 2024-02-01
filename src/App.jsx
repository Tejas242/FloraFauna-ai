import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";


function App() {
  // const [showScrollUp, setShowScrollUp] = useState(false);
  // const sections = document.querySelectorAll("section[id]");

  // sr.reveal(`.footer-container`, { origin: "bottom", delay: 500 });
  // sr.reveal(`.species-info-container`, { origin: "bottom", delay: 500 });

  return (
    <main>
      <Header />
      <Hero />
      <Footer/>
    </main>
    
  )
}

export default App