import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ProductForm from '.'

describe('Product Form Test', () => {
    const mockProps = {
        onSubmit : jest.fn()
    }

    test('field product name render correctly', async () => {
        render(<ProductForm onSubmit={mockProps.onSubmit}/>)
        const title = screen.getByText('Product Name')
        const form = screen.getByPlaceholderText('Please enter the product')
        expect(title).toBeDefined();
        expect(form).toBeDefined();
    })

    test('field product status render correctly', async () => {
        render(<ProductForm onSubmit={mockProps.onSubmit}/>)
        const title = screen.getByText('Product Status')
        const form = screen.getByPlaceholderText('Please choose product status')
        expect(title).toBeDefined();
        expect(form).toBeDefined();
    })

    test('button submit render correctly', async () => {
        render(<ProductForm onSubmit={mockProps.onSubmit}/>)
        const title = screen.getByText('Submit')
        expect(title).toBeDefined();
    })

    test('onSubmit works correctly', async () => {
        render(<ProductForm onSubmit={mockProps.onSubmit} />);
        const name = screen.getByPlaceholderText('Please enter the product') as HTMLInputElement;
        const status = screen.getByPlaceholderText('Please choose product status') as HTMLInputElement;
        const submitButton = screen.getByText('Submit');

        fireEvent.change(name, { target: { value: 'Product sample' } });
        fireEvent.change(status, { target: { value: 'Active' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
            expect(mockProps.onSubmit).toHaveBeenCalledWith({
                name: 'Product sample',
                status: 'Active',
            });
        });
    })

})