import { useState } from 'react';

export default function Contador() {
  const [valor, setValor] = useState(0);

  return (
    <div>
      <p aria-live="polite">Valor: {valor}</p>
      <div className="botones">
        <button disabled={valor === 0} onClick={() => setValor(v => Math.max(0, v - 1))}>Restar</button>
        <button disabled={valor === 10} onClick={() => setValor(v => Math.min(10, v + 1))}>Sumar</button>
        <button onClick={() => setValor(0)}>Reiniciar</button>
      </div>
    </div>
  );
}
