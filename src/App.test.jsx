import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('Renderiza o título da calculadora', () => {
  render(<App />);
  const linkElement = screen.getByText(/Calculadora de Custos 3D/i);
  expect(linkElement).toBeDefined();
});
