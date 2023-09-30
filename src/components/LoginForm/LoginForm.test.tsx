import React from 'react';
import { waitFor, fireEvent, render, screen } from '@testing-library/react'
import LoginForm from '.';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => {
    const navigate = jest.fn();
    return {
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigate,
    };
  });

describe('test login form', () => {
    const mockProps = jest.fn();
    test('title render correctly', async () => {
        render(<LoginForm onSubmit={mockProps}/>)
        const title = screen.getByText('Login Page')
        expect(title).toBeDefined();
    })

    test('label email render correctly', async () => {
        render(<LoginForm onSubmit={mockProps}/>)
        const title = screen.getByText('Email')
        expect(title).toBeDefined();
    })

    test('label password render correctly', async () => {
        render(<LoginForm onSubmit={mockProps}/>)
        const title = screen.getByText('Password')
        expect(title).toBeDefined();
    })

    test('button submit render correctly', async () => {
        render(<LoginForm onSubmit={mockProps}/>)
        const title = screen.getByText('Submit')
        expect(title).toBeDefined();
    })

    test('button register render correctly', async () => {
        render(<LoginForm onSubmit={mockProps}/>)
        const title = screen.getByText('Register')
        expect(title).toBeDefined();
    })

    test('onSubmit works correctly', async () => {
        const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={mockProps} />);
        const emailInput = getByPlaceholderText('Enter your email') as HTMLInputElement;
        const passwordInput = getByPlaceholderText('Enter your password') as HTMLInputElement;
        const submitButton = getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'testemail@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword123' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockProps).toHaveBeenCalledTimes(1);
            expect(mockProps).toHaveBeenCalledWith({
                email: 'testemail@email.com',
                password: 'testpassword123',
            });
        });
    });

    beforeEach(() => {
        const navigate = useNavigate() as jest.Mock;
        navigate.mockClear();
      });

    test('registration button click navigates to /register', () => {
        const { getByText } = render(<LoginForm onSubmit={mockProps}/>);
        const registerButton = getByText('Register');
      
        fireEvent.click(registerButton);
      
        const navigate = useNavigate();
        expect(navigate).toHaveBeenCalledWith('/register');
      });  
})
