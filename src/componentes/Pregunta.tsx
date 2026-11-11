import { useState } from 'react';

export default function Pregunta() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <p>¿Para qué sirve useState?</p>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Ocultar respuesta' : 'Mostrar respuesta'}
      </button>
      {visible && <p>Permite guardar un estado y actualizar lo que muestra el componente cuando cambia.</p>}
    </div>
  );
}
