"""Manager class for the Mongodb client"""

from flask_pymongo import PyMongo
from pymongo import TEXT


class MongoClientManager:
    """Singleton class of mongodb client """
    client: PyMongo = None
    _instance = None

    def __new__(cls, app):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls.client = PyMongo()
            cls.client.init_app(app)
            collection = cls.client.db.products
            collection.create_index(
                [('product_title', TEXT), ('product_description', TEXT), ('gender', TEXT),('brand', TEXT) ])
        return cls._instance

    @classmethod
    def get_client(cls):
        """Getter method for the client"""
        return cls.client
