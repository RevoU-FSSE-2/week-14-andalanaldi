import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import ProductEdit from '.';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useParams: jest.fn()
}))

const response = {
    "id": 1,
    "name": "Nami swan",
    "is_active": "Active",
  }

global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(response)
})

describe('Product Edit Container Testing', () => {

    test('render product edit page and updates product', async () => {

        const id = '1';
        
        (useParams as jest.Mock).mockReturnValue({ id: id});

        const navigateMock = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);

        render(
            <MemoryRouter initialEntries={[`/product/edit/${id}`]}>
                <Routes>
                    <Route path='/product/edit/:id' element={<ProductEdit />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByDisplayValue('Nami swan'))

        const name = screen.getByPlaceholderText('Please enter the product');
        const status = screen.getByPlaceholderText('Please choose product status');

        act(() => {
            fireEvent.change(name, { target: { value : 'Nami swan'}})
            fireEvent.change(status, { target: { value : 'Active'}})
            fireEvent.click(screen.getByText('Submit'));
        })

        await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/product'))
    })
})