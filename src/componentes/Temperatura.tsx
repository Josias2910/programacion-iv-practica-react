import { useState } from 'react';

export default function Temperatura() {
  const [celsius, setCelsius] = useState('');
  const grados = Number(celsius);
  const fahrenheit = grados * 9 / 5 + 32;

  return (
    <div>
      <label htmlFor="celsius">Grados Celsius</label>
      <input id="celsius" type="number" step="any" value={celsius} onChange={e => setCelsius(e.target.value)} />
      {celsius !== '' && Number.isFinite(grados) ? (
        <>
          <p aria-live="polite">Fahrenheit: {Number(fahrenheit.toFixed(2))} °F</p>
          {grados > 30 && <p>Hace calor</p>}
        </>
      ) : <p>Ingresá una temperatura.</p>}
    </div>
  );
}
