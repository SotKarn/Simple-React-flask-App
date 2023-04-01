from flask import Flask
from flask_cors import CORS
from configuration.database import MongoClientManager
from configuration.config import Config
from api.routes import bp as api_bp


def create_app():
    """Create the flask app instance"""
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    MongoClientManager(app)
    app.register_blueprint(api_bp)
    return app


if __name__ == "__main__":
    application = create_app()
    application.run(host='0.0.0.0', debug=True)
