// App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders GET STARTED button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/GET STARTED/i);
  expect(buttonElement).toBeInTheDocument();


  // Simulate a click on the "GET STARTED" button
  fireEvent.click(buttonElement);

  // After clicking, you can simulate a click in the email input field
  const emailInput = screen.getByPlaceholderText(/Enter a valid user name/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  // Check that the input value has changed
  expect(emailInput.value).toBe('test@example.com');

  // Simulate typing in the password input field
  const passwordInput = screen.getByPlaceholderText(/Enter password/i);
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  expect(passwordInput.value).toBe('password123');

   // Simulate clicking on the login button
   const loginButton = screen.getByText(/login/i);
   fireEvent.click(loginButton);
});

// You can add more tests based on the elements or content you want to verify
