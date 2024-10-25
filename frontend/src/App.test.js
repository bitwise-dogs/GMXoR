import { render, screen } from '@testing-library/react';
import App from './app/App';

beforeAll(() => {
  global.window = Object.create(window);
  Object.defineProperty(window, 'ethereum', {
    value: {}, 
  });
});

test('renders without crashing', () => {
  render(<App />);
  // Базовая проверка наличия текста или элемента
  expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
});
