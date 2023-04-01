import json
from api.app import create_app

class TestUnitSearch:

    @classmethod
    def setup_class(cls):
        app = create_app()
        cls.expected_products = [{"product_id": 1, "product_title": "dummy description"}]
        cls.client = app.test_client()


    def test_search_valid_query(self, mocker):
        mocker.patch("api.routes.search_product", return_value=self.expected_products)
        response = self.client.get('/api/v1/products/search?query=black')
        assert response.status_code == 200
        response_json = json.loads(response.text)
        assert len(response_json) == 1

    def test_search_empty_query(self, mocker):
        mocker.patch("api.routes.search_product", return_value=self.expected_products)
        response = self.client.get('/api/v1/products/search')
        assert response.status_code == 404
        response_json = json.loads(response.text)
        assert response_json['message'] == "No query url parameter provided"