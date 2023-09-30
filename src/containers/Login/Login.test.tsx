import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from '.';

global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ token: 'mockedToken'})
});

describe('Testing Login Container', () => {

    test('submits the form and set token in localStorage', async () => {
        const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
        render(<Login />)
        const email = screen.getByPlaceholderText('Enter your email');
        const password = screen.getByPlaceholderText('Enter your password');
        const button = screen.getByText('Submit');

        act(() => {
            fireEvent.change(email, { target: { value : 'email'}});
            fireEvent.change(password, { target: { value : 'password'}});
            fireEvent.click(button);
        })

        await waitFor( () => {
            expect(global.fetch).toHaveBeenCalledWith('https://mock-api.arikmpt.com/api/user/login', expect.any(Object));
            expect(mockSetItem).toHaveBeenCalledWith('token','mockedToken');
        })
    })
})