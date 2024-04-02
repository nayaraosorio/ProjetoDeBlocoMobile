import logo from "./logo.svg";
import "./App.css";
import Botao from "./Componentes/Botao";
import Banner from "./Componentes/Banner";
import Card from "./Componentes/Card";
import Formulario from "./Componentes/Formulario";
import CompHeader from "./Componentes/CompHeader";
import Footer from "./Componentes/Footer";

function App() {
  return (
    <div className="App">
      <CompHeader />
      <main>
        <div className="container-banner">
        <Banner />
        </div>
        <section className="container-cards">
        </section>
        <section className="container-saiba">
         
        </section>

        <section className="container-form">
          <Formulario />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
