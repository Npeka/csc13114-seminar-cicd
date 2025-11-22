import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app without crashing', () => {
    render(<App />);
    // Check for a known element, e.g. text 'Vite + React' or similar
    expect(screen.getByText(/react/i)).toBeInTheDocument();
  });
});
