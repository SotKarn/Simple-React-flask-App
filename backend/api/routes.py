"""Blueprint and routes for api endpoints """
from flask import Blueprint, jsonify, request
from exceptions.custom_exceptions import EmptyQueryException, SearchException, NoQueryException
from services.products import search_product

bp = Blueprint('api_route', __name__, url_prefix="/api/v1")


@bp.route('/products/search', methods=['GET'])
def get_garments():
    """Searching products which match the given value"""
    try:

        args = request.args
        search_query = args.get("query")
        if not search_query:
            raise NoQueryException()
        if search_query == "":
            raise EmptyQueryException()
        search_queries = search_query.split(" ")

        return search_product(search_queries)
    except SearchException as ex:
        print(ex.description)
        return jsonify({"message": ex.description, "code": ex.code}), 404


@bp.errorhandler(SearchException)
def handle_exception(err):
    """Return JSON of SearchException."""
    response = {
        "code": err.code,
        "message": err.description
    }
    return jsonify(response), err.code
