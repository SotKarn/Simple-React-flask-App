import { queryByTestId, render, screen } from '@testing-library/react';
import ProductContainer from '../ProductContainer';

const empty_product_list = [];
const one_product_list = [{ "product_id": 1, "product_description": "dummy_description" }];

jest.mock("../ProductCard", () => () => {
    return <mock-product-card />;
});

afterEach(() => jest.restoreAllMocks());

describe("ProductContainer unit Tests", () => {

    test('verify grid container does not exist when empty list is passed', () => {
        render(<ProductContainer search_query={"test"} productList={empty_product_list} />);
        const product_grid = screen.queryByTestId('product_list_grid');
        expect(product_grid).toBeNull()
    });

    test('verify grid container exist when one item list is passed', () => {
        render(<ProductContainer search_query={"test"} productList={one_product_list} />);
        const product_list_container = screen.getByTestId('product_list_container');
        expect(queryByTestId(product_list_container, 'product_list_grid')).toBeTruthy()
    });

    test('verify "No Products Found" h2 exist when empty item list is passed', () => {
        render(<ProductContainer search_query={"test"} productList={empty_product_list} />);
        const no_item_h2 = screen.getByTestId('empty_product_list');
        expect(no_item_h2).toBeTruthy()
        expect(screen.getByText(`No Products Found`)).toBeInTheDocument()
    });
});