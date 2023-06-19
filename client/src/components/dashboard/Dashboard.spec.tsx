import { fireEvent, render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders tabs and navbar correctly', () => {
  render(<Dashboard />);

  const allProductsTab = screen.getByText('All Products');
  const logo = screen.getByText('Barosa Shop');

  expect(allProductsTab).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
});

test('renders login button correctly', () => {
  render(<Dashboard />);

  const loginButton = screen.getByText('Login');

  expect(loginButton).toBeInTheDocument();
});

test('renders logout button correctly when logged in', () => {
  render(<Dashboard />);

  const loginButton = screen.getByText('Login');

  fireEvent.click(loginButton);

  const logoutButton = screen.getByText('Logout');

  expect(logoutButton).toBeInTheDocument();
});

test('renders my orders tab correctly when logged in', () => {
  render(<Dashboard />);

  const loginButton = screen.getByText('Login');

  fireEvent.click(loginButton);

  const myOrdersTab = screen.getByText('My Orders');

  expect(myOrdersTab).toBeInTheDocument();
});
