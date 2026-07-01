import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import CareerRoadmap from './components/CareerRoadmap';
import DevTerminal from './components/DevTerminal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Education />
      <CareerRoadmap />
      <DevTerminal />
      <Contact />
      <Footer />
      <ChatbotWidget />
    </>
  );
}

export default App;
