import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Account from '../components/Account.js';

// Defina o tema
const theme = createTheme({
  palette: {
    primary: {
      main: '#fedcd2;',
    },
  },
});

// Estilos para centralizar o conteúdo
const styles = {
  productPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Defina uma altura mínima para ocupar toda a altura da tela
    backgroundColor: '#fedcd2', // Cor de fundo da página de produto
  },
};

function AccountPage() {
  return (
    <ThemeProvider theme={theme}>
      <div style={styles.productPage}> {/* Aplicar os estilos à div principal */}
        <Account />
      </div>
    </ThemeProvider>
  );
}

export default AccountPage;
