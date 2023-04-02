import { render, screen } from '@testing-library/react';
import ErrorSnackBar from '../ErrorSnackBar';

beforeEach(() => {
    render(<ErrorSnackBar open={true} />);
});

describe("ErrorSnackBar Tests", () => {
    test('verify snackbar is dispayed', () => {
        const snackbar = screen.getByTestId('error_snackbar');
        expect(snackbar).toBeTruthy()
    });

});