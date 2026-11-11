import Producto from './componentes/Producto';
import Contador from './componentes/Contador';
import Pregunta from './componentes/Pregunta';
import Temperatura from './componentes/Temperatura';
import ListaCompras from './componentes/ListaCompras';
import Buscador from './componentes/Buscador';
import ProductoTipado from './componentes/ProductoTipado';

export default function App() {
  return (
    <main>
      <h1>Práctica React</h1>
      <p>Programación IV · Josías Schumacher</p>
      <section>
        <h2>1. Tarjetas de producto</h2>
        <div className="productos">
          <Producto nombre="Teclado" precio={25000} stock={5} />
          <Producto nombre="Mouse" precio={15000} stock={0} />
          <Producto nombre="Monitor" precio={180000} stock={3} />
        </div>
      </section>
      <section><h2>2. Contador con límites</h2><Contador /></section>
      <section><h2>3. Mostrar y ocultar</h2><Pregunta /></section>
      <section><h2>4. Conversor de temperatura</h2><Temperatura /></section>
      <section><h2>5. Lista de compras</h2><ListaCompras /></section>
      <section><h2>6. Buscador</h2><Buscador /></section>
      <section>
        <h2>7. Producto con TypeScript</h2>
        <div className="productos">
          <ProductoTipado nombre="Teclado" precio={25000} stock={5} oferta />
          <ProductoTipado nombre="Mouse" precio={15000} stock={0} />
          <ProductoTipado nombre="Monitor" precio={180000} stock={3} oferta={false} />
        </div>
      </section>
    </main>
  );
}
