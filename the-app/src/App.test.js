import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';

test('renders homepage', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const mainComponent = screen.getByTestId("main-content");
  expect(mainComponent).toBeInTheDocument();
});
