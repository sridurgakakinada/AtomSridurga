// App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Dcotor Login button', () => {
    render(<App />);
    const buttonElement = screen.getByText(/DOCTOR LOGIN/i);
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
    fireEvent.change(passwordInput, { target: { value: 'password@123' } });
    expect(passwordInput.value).toBe('password@123');
  
     // Simulate clicking on the login button
     const loginButton = screen.getByPlaceholderText(/LoginButton/i);

     fireEvent.click(loginButton);
  });
  