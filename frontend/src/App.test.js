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
  //Проверка наличия кнопки connectWallet
  expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
});
