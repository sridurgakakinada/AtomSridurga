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
  //const SendButton = screen.getByText(/Send/i);
  expect(SendButton).toBeInTheDocument();
  fireEvent.click(SendButton);

  // Click on Get Health Information Button
  const getHealthInformationButton = screen.getByText(/Get Health information/i);
  fireEvent.click(getHealthInformationButton);

  // Look for the text "Here is some health information"
  const healthInformation = screen.getByText(/Here is some health information/i);

});