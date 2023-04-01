import { cleanup, render, screen, fireEvent, waitFor} from '@testing-library/react';

import Search from '../Search';
import userEvent from "@testing-library/user-event";
import ErrorSnackBar from '../ErrorSnackBar';
import { act } from 'react-dom/test-utils';


afterEach(cleanup);

describe("Search component Tests", () => {
    beforeEach(() => {
        render(<Search />);
    });

    test('check if search container exists', () => {
        const search_container = screen.getByTestId(/search_container/i);
        expect(search_container).toBeTruthy()
    });

    test('check search input placeholder', () => {
        const search_input = screen.getByTestId(/search_input/i);
        expect(search_input).toHaveAttribute("placeholder", "What are you looking for?")
    });

    test('check if search input field exists', () => {
        const search_input = screen.getByTestId(/search_input/i);
        expect(search_input).toBeTruthy()
    });

    test('check if search button exists', () => {
        const search_button = screen.getByTestId(/search_button/i);
        expect(search_button).toBeTruthy()
    });



});

test('verify error snackbar appears upon error response', async ()=>{
    // jest.mock('../ErrorSnackbar');
    render(<Search />);
    global.fetch = jest.fn(() =>{} );
    fetch.mockImplementationOnce(() => Promise.reject({ "message": "test error occurred", "code": "404" }));
    const search_button = screen.getByTestId("search_button");

    await act( () => userEvent.click(search_button));
    await act( () => render(<ErrorSnackBar />));
    await act( () => {
        const emailInput = screen.getByTestId("error_snackbar");
        expect(emailInput).toBeInTheDocument();
    });


});