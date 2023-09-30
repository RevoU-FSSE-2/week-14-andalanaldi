import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ProductNew from '.';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}))

describe('Product New Container testing', () => {
    test('renders product form and submits new product', async () => {
        const navigateMock = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);

        render(
          <MemoryRouter>
            <ProductNew />
          </MemoryRouter>
        );
      
        global.fetch = jest.fn().mockResolvedValue({
          json: () => Promise.resolve({}),
        });
      
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Please enter the product'), { target: { value: 'Nami swan' } });
            fireEvent.change(screen.getByPlaceholderText('Please choose product status'), { target: { value: 'Active' } });
        
            fireEvent.click(screen.getByText('Submit'));
        })
      
        await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/product'))
      });
})