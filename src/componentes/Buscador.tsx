import { useState } from 'react';

const lenguajes = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go'];

export default function Buscador() {
  const [busqueda, setBusqueda] = useState('');
  const resultados = lenguajes.filter(lenguaje => lenguaje.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div>
      <label htmlFor="busqueda">Buscar lenguaje</label>
      <input id="busqueda" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      <p aria-live="polite">Resultados: {resultados.length}</p>
      <ul>{resultados.map(lenguaje => <li key={lenguaje}>{lenguaje}</li>)}</ul>
    </div>
  );
}
