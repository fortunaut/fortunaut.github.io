import './Header.css'

const Header = () => {
  return (
    <header>
      <div class='Header' >
        <a href="/" class="Header-title Header-link">
          fortunaut.dev
        </a>
        <a href="/about" class="Header-link">about</a>
        <a href="/blog" class="Header-link">blog</a>
      </div>
    </header>
  );
}

export default Header;