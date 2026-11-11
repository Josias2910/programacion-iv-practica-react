interface ProductoProps {
  nombre: string;
  precio: number;
  stock: number;
  oferta?: boolean;
}

export default function ProductoTipado({ nombre, precio, stock, oferta }: ProductoProps) {
  return (
    <article className="producto">
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      <p>{stock === 0 ? 'Sin stock' : `Stock: ${stock}`}</p>
      {oferta && <p className="oferta">¡Oferta!</p>}
    </article>
  );
}
