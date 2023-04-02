import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

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
describe("ProductCard component Tests", () => {
    beforeEach(() => {
        render(<ProductCard data={dummyProduct} />);
    });

    test('verify images exist', () => {
        const images = screen.getAllByRole('img');
        expect(images).toBeTruthy()
    });

    test('verify product title exists', () => {
        const productTitle = screen.getByText(`${dummyProduct.product_title}`);
        expect(productTitle).toBeTruthy()
    });

    test('verify product price exists', () => {
        const productPrice = screen.getByText(`Price: ${dummyProduct.price} ${dummyProduct.currency_code}`);
        expect(productPrice).toBeTruthy()
    });

    test('verify product stock exists', () => {
        const productStock = screen.getByText(`Stock: ${dummyProduct.stock}`);
        expect(productStock).toBeTruthy()
    });
});
