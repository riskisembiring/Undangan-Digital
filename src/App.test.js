import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wedding invitation hero content', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /Bulan & Bintang/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Buka Undangan/i })).toBeInTheDocument();
});
