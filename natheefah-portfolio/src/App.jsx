import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar    from './components/Navbar';
import Cursor    from './components/Cursor';
import Home      from './pages/Home';
import About     from './pages/About';
import Certs     from './pages/Certs';
import Skills    from './pages/Skills';
import Projects  from './pages/Projects';
import Contact   from './pages/Contact';

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/about"    element={<About />}    />
        <Route path="/certs"    element={<Certs />}    />
        <Route path="/skills"   element={<Skills />}   />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact"  element={<Contact />}  />
      </Routes>
    </BrowserRouter>
  );
}