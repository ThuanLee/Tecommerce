bind = '0.0.0.0:8000'

# Gunicorn

# gunicorn backend.wsgi:application -c gunicorn_config.py


# Nginx

# sudo systemctl start nginx.service
# sudo systemctl stop nginx.service

# sudo nano /etc/nginx/sites-available/backend

# sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled

# server {
#     listen 80;
#     server_name 127.0.0.1;

#     location = /favicon.ico { access_log off; log_not_found off; }
#     location /static/ {
#         root /home/sammy/myprojectdir;
#     }

#     location / {
#         proxy_pass http://127.0.0.1:8000;
#     }
# }