FROM python:3.11-alpine

ENV MONGO_USERNAME="root"
ENV MONGO_PASSWORD="example"
ENV PYTHONPATH "/backend"
COPY ./requirements.txt /backend/requirements.txt

WORKDIR /backend
RUN  pip install -r requirements.txt

COPY . /backend
ENTRYPOINT [ "python3", "./api/app.py"]

