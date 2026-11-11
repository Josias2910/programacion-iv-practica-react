import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

interface Item { id: number; nombre: string }

export default function ListaCompras() {
  const [texto, setTexto] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const siguienteId = useRef(1);

  function agregar(evento: FormEvent) {
    evento.preventDefault();
    const nombre = texto.trim();
    if (!nombre) return;
    const nuevo = { id: siguienteId.current++, nombre };
    setItems(anteriores => [...anteriores, nuevo]);
    setTexto('');
  }

  function eliminar(id: number) {
    setItems(anteriores => anteriores.filter(item => item.id !== id));
  }

  return (
    <div>
      <form onSubmit={agregar}>
        <label htmlFor="compra">Producto para comprar</label>
        <input id="compra" value={texto} onChange={e => setTexto(e.target.value)} />
        <button>Agregar</button>
      </form>
      {items.length === 0 ? <p>No hay nada para comprar</p> : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.nombre} <button onClick={() => eliminar(item.id)} aria-label={`Eliminar ${item.nombre}`}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
