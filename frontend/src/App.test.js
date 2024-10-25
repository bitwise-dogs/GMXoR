import { render, screen } from '@testing-library/react';
import App from './app/App';


beforeAll(() => {
  global.window = Object.create(window);
  Object.defineProperty(window, 'ethereum', {
    value: {}, 
  });
});


import { render, screen } from '@testing-library/react';
import App from './app/App';

test('renders without crashing', () => {
  render(<App />);
  // Можно добавить базовую проверку, например, проверку наличия текста или элемента
  expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
});
