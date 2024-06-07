import './Banner.css';
import { Link } from 'react-router-dom';
import AppBarMenu from '../AppBarMenu/Index';

function Banner() {
  return (
    <header className="banner">
      <div className="menu-container">
        <AppBarMenu />
      </div>
      <Link to="/">
        <img src="/imagens/clubeDoLivro.png" alt="Banner principal da página" />
      </Link>
    </header>
  );
}

export default Banner;
