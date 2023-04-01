import json
from api.app import create_app


class TestFunctionalSearch:

    @classmethod
    def setup_class(cls):
        app = create_app()
        cls.client = app.test_client()

    def test_search(self):
        response = self.client.get('/api/v1/products/search?query=black')
        assert response.status_code == 200

    def test_no_query_parameter(self):
        response = self.client.get('/api/v1/products/search?test="test"')
        assert response.status_code == 404
        response_json = json.loads(response.text)
        assert response_json['message'] == "No query url parameter provided"

    def test_invalid_endpoint(self):
        response = self.client.get('v1/products/search?query="test"')
        assert response.status_code == 404
