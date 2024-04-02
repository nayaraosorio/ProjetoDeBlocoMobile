import Botao from '../Botao';
import './Formulario.css'; // Importe o arquivo de estilos se necessário

function Formulario() {
  return (
    <div className="formulario">
      <div className="linha">
        <div className="campo">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" />
        </div>
      </div>
      <div className="linha">
        <div className="campo">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="campo">
          <label htmlFor="celular">Celular:</label>
          <input type="tel" id="celular" name="celular" />
        </div>
      </div>
      <div className="linha">
        <div className="campo">
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea id="mensagem" name="mensagem" rows="4" />
        </div>
      </div>
      <Botao>Enviar</Botao>
    </div>
  );
}

export default Formulario;
