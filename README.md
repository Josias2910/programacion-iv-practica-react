# Práctica React

Programación IV — Josías Schumacher.

Resolución de los siete ejercicios de `practica-react.pdf`. Cada ejercicio está en un componente dentro de `src/componentes` y se puede probar en la misma página.

## Ejecutar

Requiere Node.js 22.12 o superior.

```bash
npm ci
npm run dev
```

Abrir la dirección que indica Vite en la terminal.

## Ejercicios

1. `Producto.jsx`: props y stock, con tres productos distintos.
2. `Contador.tsx`: valores de 0 a 10, límites y reinicio.
3. `Pregunta.tsx`: mostrar y ocultar la respuesta.
4. `Temperatura.tsx`: conversión de Celsius a Fahrenheit y aviso de calor.
5. `ListaCompras.tsx`: agregar y eliminar productos sin aceptar texto vacío.
6. `Buscador.tsx`: filtro sin distinguir mayúsculas y cantidad de resultados.
7. `ProductoTipado.tsx`: versión con `ProductoProps` y `oferta` opcional.

Dejé el primer componente en JavaScript para poder comparar la versión original con la tipada. Los datos quedan en memoria: al recargar se reinician.

## Comprobar

```bash
npm test
npm run build
```

`build` revisa los tipos y genera la carpeta `dist`.

Consigna: https://github.com/marianoggg/utn-tup-2026-frontend-clase/blob/main/TPS/practica-react.pdf
