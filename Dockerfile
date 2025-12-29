# Use a build argument for cache busting
ARG CACHEBUST=1

FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install nginx -y && \
    apt-get install git -y && \
    apt-get install supervisor -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy NGINX config
COPY front-end.conf /etc/nginx/sites-available/default

COPY package.json /var/www/html/
COPY package-lock.json /var/www/html/

WORKDIR /var/www/html/

RUN npm install
RUN npm install pm2 -g

COPY . /var/www/html/

# Use the CACHEBUST argument to force rebuilding if it changes
RUN npm run build

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose port 80 for NGINX
EXPOSE 80

# Start NGINX in the foreground
# CMD ["nginx", "-g", "daemon off;"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
