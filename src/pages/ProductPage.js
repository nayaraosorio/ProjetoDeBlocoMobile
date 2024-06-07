import React from 'react';
import SubscribeForm from '../components/SubscribeForm'; // Importe o componente SubscribeForm
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

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

function ProductPage() {
  return (
    <ThemeProvider theme={theme}>
      <div style={styles.productPage}> {/* Aplicar os estilos à div principal */}
        <SubscribeForm /> {/* Renderizar o componente SubscribeForm */}
      </div>
    </ThemeProvider>
  );
}

export default ProductPage;
