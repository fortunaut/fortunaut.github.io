import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Donate from './pages/Donate';
import Blog from './pages/Blog';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <main className="App-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/donate' element={<Donate />} />
            <Route path='/blog' element={<Blog />} />
          </Routes>
        </main>
        <footer>
          <div className="App-footer">
            This site is maintained by <a href="mailto:me@fortunaut.dev">fortunaut</a>
            <div><a href="/donate">Support the site</a></div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
