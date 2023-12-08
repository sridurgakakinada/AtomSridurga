import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Dcotor Login button', () => {
    render(<App />);

    const chatBotIcon = screen.getByTitle(/ChatbotIcon/i);
    expect(chatBotIcon).toBeInTheDocument();
    fireEvent.click(chatBotIcon);

    // Find the input field for "User Name" and enter a name
  const TextOneInput = screen.getByPlaceholderText(/Type your message.../i);
  fireEvent.change(TextOneInput, { target: { value: 'Hi' } });
  expect(TextOneInput.value).toBe('Hi');

  // Click on Send
  const SendButton = screen.getByText(/Send/i);
  expect(SendButton).toBeInTheDocument();
  fireEvent.click(SendButton);

  // Enter your name
  const enterName = screen.getByPlaceholderText(/Type your message.../i);
  fireEvent.change(TextOneInput, { target: { value: 'Sri' } });
  expect(TextOneInput.value).toBe('Sri');

  // Click on Send
  // Const SendButton = screen.getByText(/Send/i);
  expect(SendButton).toBeInTheDocument();
  fireEvent.click(SendButton);

  // Click on Find Nearest Client
  const findNearestClientButton = screen.getByText(/Find Nearest Client/i);
  fireEvent.click(findNearestClientButton);

  // Look for the text "Please enter the pin code of your location:"
  const enterPinCodeText = screen.getByText(/Please enter the pin code of your location/i);

  // Enter PinCode 
  const enterPinCode = screen.getByPlaceholderText(/Type your message.../i);
  fireEvent.change(enterPinCode, { target: { value: '10001' } });
  expect(TextOneInput.value).toBe('10001');
  
  // Click on Send
  fireEvent.click(SendButton);

  // Look for the Clinic details obtained
  const ClinicDetailsOne = screen.getByText(/Healthy Clinic/i);
  const ClinicDetailsTwo = screen.getByText(/Sunshine Clinic/i);

  // Try to give a false entry as the pincode
  //Click on Find Nearest Client
  //const findNearestClientButton = screen.getByText(/Find Nearest Client/i);
  fireEvent.click(findNearestClientButton);

  // Enter False Pincode
  fireEvent.change(enterPinCode, { target: { value: '12001' } });
  expect(TextOneInput.value).toBe('12001');

  // Click on Send
  fireEvent.click(SendButton);

  // Look for the Text to retry
  const retryAgainText = screen.getByText(/Please try again/i);

});