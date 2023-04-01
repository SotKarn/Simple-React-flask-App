"""Service layer for searching an item"""
import json
from bson import json_util
from configuration.database import MongoClientManager


def search_product(search_queries):
    """Search an item in the database based on text query"""

    client = MongoClientManager.get_client()
    final_query = ', '.join(f'"{w}"' for w in search_queries)
    results = client.db.products.find({"$text": {"$search": final_query}})
    results_sanitized: list = json.loads(json_util.dumps(results))
    return results_sanitized
