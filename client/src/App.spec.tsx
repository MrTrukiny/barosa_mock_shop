import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders the app component', () => {
  render(<App />);

  const linkElement = screen.getByText(/Vite \+ React/i);
  expect(linkElement).toBeInTheDocument();
});
