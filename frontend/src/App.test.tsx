import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders EPICREUSE heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/EPICREUSE/i);
  expect(headingElement).toBeInTheDocument();
});
