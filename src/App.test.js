import React from 'react';
// import { render } from '@testing-library/react';
import App from './App';
import { render, fireEvent, screen, act } from '@testing-library/react';
jest.setTimeout(61000)
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// File: App.test.js

describe('Typing Speed Test App', () => {
  test('renders the app without crashing', () => {
    render(<App />);
    expect(screen.getByText('How Fast Can You Type?')).toBeInTheDocument();
  });

  test('starts the typing test when "GO!" button is clicked', async () => {
    render(<App />);
    const startButton = screen.getByText('GO!');
    fireEvent.click(startButton);
    
    // Wait for the typing test to start
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    expect(screen.getByTestId('typing-input')).toBeInTheDocument();
  });

  test('ends the typing test when the time is up', async () => {
    render(<App />);
    const startButton = screen.getByText('GO!');
    fireEvent.click(startButton);

    // Wait for the typing test to end
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 61000)); // A bit more than 60 seconds
    });

    expect(screen.getByText('Reload')).toBeInTheDocument();
  });

  test('correctly handles typing input and calculates accuracy', async () => {
    render(<App />);
    const startButton = screen.getByText('GO!');
    fireEvent.click(startButton);

    // Simulate typing correct characters
    fireEvent.keyDown(screen.getByTestId('typing-input'), { key: 'H' });
    fireEvent.keyDown(screen.getByTestId('typing-input'), { key: 'e' });

    // Simulate typing an incorrect character
    fireEvent.keyDown(screen.getByTestId('typing-input'), { key: 'x' });

    // Wait for the state to update
    await screen.findByText('Errors: 1');

    expect(screen.getByText('Acuracy: 66%')).toBeInTheDocument();
  });

  // Add more tests based on your application's features and requirements
});
