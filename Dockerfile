FROM python:3.8

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt
RUN pip install --upgrade Flask Werkzeug
RUN pip install Flask requests
RUN pip install -U flask-cors
RUN pip install pgeocode

EXPOSE 5000

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["flask", "run"]
