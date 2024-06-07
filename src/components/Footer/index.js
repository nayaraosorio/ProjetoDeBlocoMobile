import React from 'react';
import './Footer.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-column">
        <h4>Sobre o clube do Livro</h4>
        <ul>
          <li><a href="/nosso-proposito">Nosso Propósito</a></li>
          <li><a href="/nossa-equipe">Nossa Equipe</a></li>
          <li><a href="/trabalhe-conosco">Trabalhe Conosco</a></li>
          <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
          <li><a href="/termos-de-aceite">Termos de Aceite</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Ajuda</h4>
        <ul>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/duvidas-frequentes">Dúvidas Frequentes</a></li>
          <li><a href="/minha-area-de-login">Acessar minha área de login</a></li>
          <li><a href="/fale-conosco"><CallIcon className='icon'/> Fale Conosco</a></li>
          <li><a href="mailto:atendimento@clubedolivro.com.br"><MailOutlineIcon className='icon'/> atendimento@clubedolivro.com.br</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Divulgação</h4>
        <ul>
          <li><a href="mailto:parcerias@clubedolivro.com.br"><MailOutlineIcon className='icon'/> parcerias@clubedolivro.com.br</a></li>
          <li><a href="mailto:imprensa@clubedolivro.com.br"><MailOutlineIcon className='icon'/> imprensa@clubedolivro.com.br</a></li>
        </ul>
      </div>

      <div className="address-container">
      <img src="/imagens/clubeDoLivro.png" alt="Banner principal da página" />
        <p>
          Clube do Livro<br/>
          CNPJ 00.000.000/0000-00<br/>
          Al. das Laranjeiras, 000 - Cj. 00 | Nárnia<br/>
          00000-000 | Algum Lugar - AL
        </p>
      </div>
    </footer>
  );
};

export default Footer;