import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('clicks on GET STARTED and then on Register', () => {
  render(<App />);
  
  // Simulate a click on the "GET STARTED" button
  const getStartedButton = screen.getByText(/GET STARTED/i);
  fireEvent.click(getStartedButton);

  // After clicking, simulate a click on the Register link
  const registerLink = screen.getByText(/Register/i);
  fireEvent.click(registerLink);

  // Check if the "Sign up" label is present
  const signUpLabel = screen.getByText(/Sign up/i);
  expect(signUpLabel).toBeInTheDocument();
  
  
  // Find the input field for "User Name" and enter a name
  const nameInput = screen.getByPlaceholderText(/Your userName/i);
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  expect(nameInput.value).toBe('John Doe');

  // Find the input field entering "Full Name" and enter a name
  const fullNameInput = screen.getByPlaceholderText(/Your Full Name/i);
  fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
  expect(fullNameInput.value).toBe('John Doe');
  
  // Find the input field for email and enter a valid email
  const emailInput = screen.getByPlaceholderText(/Your Email/i);
  fireEvent.change(emailInput, { target: { value: 'sridurga@gmail.com' } });
  expect(emailInput.value).toBe('sridurga@gmail.com');

  // Find the input field for phone Number and enter a valid email
  const phoneNumberInput = screen.getByPlaceholderText(/Phone Number/i);
  fireEvent.change(phoneNumberInput, { target: { value: '123456789' } });
  expect(phoneNumberInput.value).toBe('123456789');


  // Find the input field for Password and enter a valid password
  const repeatPasswordInput = screen.getByPlaceholderText(/Repeat Password/i);
  fireEvent.change(repeatPasswordInput, { target: { value: 'Sri@1997' } });
  expect(repeatPasswordInput.value).toBe('Sri@1997');

  // Find all elements with the label "Password"
  // const passwordInputs = screen.

  // // Assuming you want the first password input, you can access it like this
  // const passwordInput = passwordInputs[0];

  // // Simulate typing in the password input field
  // fireEvent.change(passwordInput, { target: { value: 'sridurga' } });

  // Simulate clicking on the Register button
  const registerButton = screen.getByText(/Register/i);
  fireEvent.click(registerButton);

});