//O componente "HomePage" - Página principal
import Login from "../components/Login";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc8239',
    },
  },
});

const styles = {
  loginPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Defina uma altura mínima para ocupar toda a altura da tela
    backgroundColor: '#fedcd2', // Cor de fundo da página de produto
    

  }
};

function LoginPage() {
  return (
    <main><div style={styles.loginPage}>
    <ThemeProvider theme={theme}>
      
        <Login />
     
    </ThemeProvider> </div></main>
  );
}

export default LoginPage;