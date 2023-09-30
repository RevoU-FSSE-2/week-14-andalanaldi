import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductList from './index';

const response = {
    "products": [
        {
          "id": 1,
          "name": "Nami swan",
          "is_active": "Active",
        },
      ],
    
      "total": 10,
      "skip": 0,
      "limit": 3
}

global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(response)
})

describe('Product List No Query Testing', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
              matches: false,
              media: query,
              onchange: null,
              addListener: jest.fn(), // Deprecated
              removeListener: jest.fn(), // Deprecated
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              dispatchEvent: jest.fn(),
            })),
          });
    })
    test('render correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/product']}>
                <Routes>
                    <Route  path='/product' element={<ProductList />}/>
                </Routes>
            </MemoryRouter>
        )

        await waitFor(
            () => screen.getByText('Nami swan')
        );
        // expect(screen.getByText('Detail')).toBeDefined()
        expect(screen.getByText('Edit')).toBeDefined()
        expect(screen.getByText('Delete')).toBeDefined()
    })
})