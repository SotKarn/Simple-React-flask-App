"""Custom Exceptions"""


class SearchException(Exception):
    """Base Exception"""
    code = 404
    description = None


class EmptyQueryException(SearchException):
    """Exception when query url parameter is empty"""
    description = "Empty query"


class NoQueryException(SearchException):
    """Exception when query url parameter is missing"""
    description = "No query url parameter provided"
