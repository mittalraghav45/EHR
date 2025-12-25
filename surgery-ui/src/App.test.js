jest.mock('react-request-hook', () => ({
  useResource: () => [null, jest.fn()],
  RequestProvider: ({ children }) => children
}));

import { render, screen } from '@testing-library/react';
import App from './App';


test('renders home page title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Cloud Surgery Services/i);
  expect(titleElement).toBeInTheDocument();
});
