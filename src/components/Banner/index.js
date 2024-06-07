import './Banner.css';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Banner() {
    
    return(
        <header className="banner">
        <Link to="/"><img src="/imagens/clubeDoLivro.png" alt="Banner principal da página" /></Link>
        <div className='icon-login'>
        <Link to="/login"><AccountCircleIcon sx={{ fontSize: 40 }} className='color-icon' title="Entrar" /></Link>
        </div>
        <div className='menu'>
        <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Fórum</Link></li>
            </ul>
          </nav>
          </div>
        
    </header>
    );
}

export default Banner;