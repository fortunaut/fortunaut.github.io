import './Header.css'
import { Link } from 'react-router';

const Header = () => {
  return (
    <header>
      <div className="Header" >
        <Link to="" className="Header-title Header-link">
          fortunaut.dev
        </Link>
        <Link to="/about" className="Header-link">about</Link>
        <Link to="/blog" className="Header-link">blog</Link>
      </div>
    </header>
  );
}

export default Header;