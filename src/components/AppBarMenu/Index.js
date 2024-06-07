import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe o componente Link e useNavigate do React Router
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress'; // Importe o componente CircularProgress para o indicador de carregamento
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Importe a função de logout do Firebase e onAuthStateChanged
import { authFB } from '../../firebaseConfig';

const pages = [
  { label: 'Home', link: '/' },
  { label: 'Fórum', link: '/services' },
  { label: 'Membros', link: '/members' }
];

const settings = ['Meu Perfil', 'Conta', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false); // Estado para controlar o carregamento
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // Estado para controlar a autenticação do usuário
  const navigate = useNavigate(); // Use o hook useNavigate para realizar o redirecionamento

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFB, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setLoading(true); // Ativa o carregamento
    signOut(authFB) // Realize o logout utilizando a função signOut do Firebase
      .then(() => {
        console.log('User logged out');
        setLoading(false); // Desativa o carregamento
        setAnchorElUser(null); // Fecha o menu do usuário
        navigate('/'); // Redirecione para a página de Home após o logout
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        setLoading(false); // Desativa o carregamento em caso de erro
        alert('Erro ao fazer logout. Tente novamente.');
      });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#df744a' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link to={page.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography textAlign="center" sx={{ color: '#df744a', fontSize: '30px', fontWeight: 'bold' }}>{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#df744a', display: 'relative', fontSize: '20px', fontWeight: 'bold' }}
              >
                <Link to={page.link} style={{ textDecoration: 'none', color: 'inherit' }}>{page.label}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                sx={{ my: 2, color: '#df744a', display: 'relative', fontSize: '20px', fontWeight: 'bold' }}
              >
                Login
              </Button>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{ color: '#df744a' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Exibe o indicador de carregamento quando o estado loading estiver ativo */}
      {loading && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <CircularProgress sx={{ color: '#df744a' }} />
        </Box>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
