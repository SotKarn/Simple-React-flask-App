"""Configuration file"""

import os
from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))

#pylint : disable = R0903
class Config:
    """Class for declaring configuration properties"""
    MONGO_URI = "mongodb://" + \
                os.environ.get("FLASK_MONGO_ADMIN_USERNAME") + \
                ":" + \
                os.environ.get("FLASK_MONGO_ADMIN_PASSWORD") + \
                "@mongodb:27017/" +  \
                os.environ.get("FLASK_MONGO_ADMIN_PASSWORD") + \
                "?authSource=admin"
