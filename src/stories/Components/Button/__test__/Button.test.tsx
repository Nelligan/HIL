import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Button } from '../Button';
afterEach(cleanup)
describe('', () => {
    it('will have search', () => {
         render(<Button text="Save" />);
         const elm = screen.getByText("Save")
         expect(elm).toBeInTheDocument()
    })

})
