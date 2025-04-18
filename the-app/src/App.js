import './App.css';
import Header from './layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Donate from './pages/Donate';
import Blog from './pages/Blog';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <main className="App-content" data-testid="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/donate' element={<Donate />} />
            <Route path='/blog' element={<Blog />} />
          </Routes>
        </main>
        <footer>
          <div className="App-footer">
            This site is maintained by <a href="https://github.com/fortunaut">fortunaut</a>
            <div><a href="/donate">Support the site</a></div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
