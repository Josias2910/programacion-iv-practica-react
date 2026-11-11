import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Producto from './componentes/Producto';
import Contador from './componentes/Contador';
import Pregunta from './componentes/Pregunta';
import Temperatura from './componentes/Temperatura';
import ListaCompras from './componentes/ListaCompras';
import Buscador from './componentes/Buscador';
import ProductoTipado from './componentes/ProductoTipado';
import App from './App';

describe('Práctica React', () => {
  it('muestra los datos del producto y avisa cuando no hay stock', () => {
    const { rerender } = render(<Producto nombre="Mouse" precio={15000} stock={0} />);
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    expect(screen.getByText('Precio: $15000')).toBeInTheDocument();
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    rerender(<Producto nombre="Mouse" precio={15000} stock={3} />);
    expect(screen.getByText('Stock: 3')).toBeInTheDocument();
  });

  it('mantiene el contador entre 0 y 10 y permite reiniciarlo', async () => {
    const usuario = userEvent.setup();
    render(<Contador />);
    expect(screen.getByRole('button', { name: 'Restar' })).toBeDisabled();
    const sumar = screen.getByRole('button', { name: 'Sumar' });
    for (let i = 0; i < 12; i++) await usuario.click(sumar);
    expect(screen.getByText('Valor: 10')).toBeInTheDocument();
    expect(sumar).toBeDisabled();
    await usuario.click(screen.getByRole('button', { name: 'Restar' }));
    expect(screen.getByText('Valor: 9')).toBeInTheDocument();
    expect(sumar).toBeEnabled();
    await usuario.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(screen.getByText('Valor: 0')).toBeInTheDocument();
  });

  it('alterna la respuesta y el texto del botón', async () => {
    const usuario = userEvent.setup();
    render(<Pregunta />);
    expect(screen.queryByText(/Permite guardar un estado/)).not.toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Mostrar respuesta' }));
    expect(screen.getByText(/Permite guardar un estado/)).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Ocultar respuesta' }));
    expect(screen.queryByText(/Permite guardar un estado/)).not.toBeInTheDocument();
  });

  it('convierte temperaturas y solo avisa calor por encima de 30', async () => {
    const usuario = userEvent.setup();
    render(<Temperatura />);
    const entrada = screen.getByLabelText('Grados Celsius');
    expect(screen.getByText('Ingresá una temperatura.')).toBeInTheDocument();
    await usuario.type(entrada, '35');
    expect(screen.getByText('Fahrenheit: 95 °F')).toBeInTheDocument();
    expect(screen.getByText('Hace calor')).toBeInTheDocument();
    await usuario.clear(entrada);
    await usuario.type(entrada, '30');
    expect(screen.getByText('Fahrenheit: 86 °F')).toBeInTheDocument();
    expect(screen.queryByText('Hace calor')).not.toBeInTheDocument();
    await usuario.clear(entrada);
    await usuario.type(entrada, '-40');
    expect(screen.getByText('Fahrenheit: -40 °F')).toBeInTheDocument();
    await usuario.clear(entrada);
    await usuario.type(entrada, '0');
    expect(screen.getByText('Fahrenheit: 32 °F')).toBeInTheDocument();
    await usuario.clear(entrada);
    expect(screen.queryByText(/Fahrenheit:/)).not.toBeInTheDocument();
  });

  it('rechaza compras vacías y permite agregar y eliminar duplicados por separado', async () => {
    const usuario = userEvent.setup();
    render(<ListaCompras />);
    const entrada = screen.getByLabelText('Producto para comprar');
    const agregar = screen.getByRole('button', { name: 'Agregar' });
    await usuario.click(agregar);
    await usuario.type(entrada, '   ');
    await usuario.click(agregar);
    expect(screen.getByText('No hay nada para comprar')).toBeInTheDocument();
    await usuario.clear(entrada);
    await usuario.type(entrada, ' Pan ');
    await usuario.click(agregar);
    expect(entrada).toHaveValue('');
    await usuario.type(entrada, 'Pan{Enter}');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    await usuario.click(screen.getAllByRole('button', { name: 'Eliminar Pan' })[0]);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    await usuario.click(screen.getByRole('button', { name: 'Eliminar Pan' }));
    expect(screen.getByText('No hay nada para comprar')).toBeInTheDocument();
  });

  it('filtra sin distinguir mayúsculas y muestra resultados vacíos', async () => {
    const usuario = userEvent.setup();
    render(<Buscador />);
    const entrada = screen.getByLabelText('Buscar lenguaje');
    expect(screen.getByText('Resultados: 9')).toBeInTheDocument();
    await usuario.type(entrada, 'JA');
    expect(screen.getByText('Resultados: 2')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    await usuario.clear(entrada);
    await usuario.type(entrada, 'zzzz');
    expect(screen.getByText('Resultados: 0')).toBeInTheDocument();
  });

  it('muestra oferta solo si es verdadera', () => {
    const { rerender } = render(<ProductoTipado nombre="Teclado" precio={10} stock={0} oferta />);
    expect(screen.getByText('¡Oferta!')).toBeInTheDocument();
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    rerender(<ProductoTipado nombre="Teclado" precio={10} stock={1} oferta={false} />);
    expect(screen.queryByText('¡Oferta!')).not.toBeInTheDocument();
    rerender(<ProductoTipado nombre="Teclado" precio={10} stock={1} />);
    expect(screen.queryByText('¡Oferta!')).not.toBeInTheDocument();
  });

  it('incluye siete ejercicios y tres tarjetas en el primero', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(7);
    const primero = screen.getByRole('heading', { name: '1. Tarjetas de producto' }).closest('section')!;
    expect(within(primero).getAllByRole('article')).toHaveLength(3);
  });
});
