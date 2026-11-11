export default function Producto({ nombre, precio, stock }) {
  return (
    <article className="producto">
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      <p>{stock === 0 ? 'Sin stock' : `Stock: ${stock}`}</p>
    </article>
  );
}
