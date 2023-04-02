import { render, screen, within, waitFor } from '@testing-library/react';
import React from 'react';
import Search from '../Search';
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';

const endpoint_base_url = "http://localhost:5000/api/v1/products/search"
const dummyProduct = {
    "gender": "test gender",
    "product_id": "test product_id",
    "product_title": "test product_title",
    "product_description": "test product_description",
    "brand": "test brand",
    "price": 19.0,
    "currency_code": "EUR",
    "stock": 1,
    "image_urls": [
        "https://www.bloobox.gr/Images/Products/Normal/590000/599568__3475551.jpg",
        "https://www.bloobox.gr/Images/Products/Normal/590000/599568.jpg",
        "https://www.bloobox.gr/Images/Products/Normal/590000/599568_2.jpg"
    ]
};

beforeEach(() => {
    render(<Search />);
});

describe("Search component unit tests", () => {

    test('check if search container exists', () => {
        const search_container = screen.getByTestId('search_container');
        expect(search_container).toBeTruthy()
    });

    test('check search input placeholder', () => {
        const search_input = screen.getByTestId('search_input_field');
        expect(search_input).toHaveAttribute("placeholder", "What are you looking for?")
    });

    test('check if search input field exists', () => {
        const search_input = screen.getByTestId('search_input_field');
        expect(search_input).toBeTruthy()
    });

    test('check if search button exists', () => {
        const search_button = screen.getByTestId('search_button');
        expect(search_button).toBeTruthy()
    });

    test('check search query input changes', () => {
        const search_input = screen.getByTestId('search_input_field');
        act(() => userEvent.type(search_input, 'black'));
        expect(search_input).toHaveValue("black");
    });
});


describe("Search component functional tests", () => {
    let fetchSpy = null;

    afterEach(() => jest.restoreAllMocks());

    async function mockFetch(url) {
        if (url.startsWith(endpoint_base_url) && url.includes("valid query")) {
            return {
                ok: true,
                status: 200,
                json: async () => [dummyProduct],
            };
        }

        return {
            ok: false,
            status: 404,
            json: async () => [{ "message": "testing error", "code": "404" }],
        }
    }

    test('verify error snackbar appears when we press search button with empty text', async () => {
        const search_button = screen.getByTestId("search_button");
        act(() => userEvent.click(search_button));
        await waitFor(() => expect(screen.getByTestId("error_snackbar")).toBeTruthy());
    });

    test('verify closes error snackbar when we press the close button', async () => {


        const search_button = screen.getByTestId("search_button");
        act(() => userEvent.click(search_button));

        await waitFor(() => expect(screen.getByTestId("error_snackbar")).toBeTruthy());
        const close = within(screen.getByTestId("error_snackbar")).getByTitle('Close');
        act(() => userEvent.click(close));
        const snackbar = screen.queryByTestId('error_snackbar');
        await waitFor(() => expect(snackbar).not.toBeInTheDocument());
    });

    test('verify table with products exists with response ok', async () => {

        fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

        const search_input = screen.getByTestId('search_input_field');
        act(() => userEvent.type(search_input, 'valid query'));
        expect(search_input).toHaveValue("valid query");

        const search_button = screen.getByTestId("search_button");
        act(() => userEvent.click(search_button));

        expect(fetchSpy).toHaveBeenCalled();
        expect(fetchSpy).toHaveBeenCalledWith(endpoint_base_url + "?query=valid query")

        expect(await screen.queryByTestId('error_snackbar')).not.toBeInTheDocument();
        await waitFor(() => expect(screen.getByTestId("product_list_container")).toBeVisible());
    });



    test('verify table with products does not exist uppon error', async () => {

        fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

        const search_input = screen.getByTestId('search_input_field');
        act(() => userEvent.type(search_input, 'dummy'));
        expect(search_input).toHaveValue("dummy");

        const search_button = screen.getByTestId("search_button");
        await act(async () => userEvent.click(search_button));

        expect(fetchSpy).toHaveBeenCalled();
        expect(fetchSpy).toHaveBeenCalledWith(endpoint_base_url + "?query=dummy");

        expect(screen.queryByTestId('product_list_container')).toBeNull();
    });


});
