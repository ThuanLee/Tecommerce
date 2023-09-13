FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic

CMD ["gunicorn", "backend.wsgi:application", "-c", "gunicorn_config.py"]