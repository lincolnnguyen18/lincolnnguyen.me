# Use the official NGINX image as the base image
FROM --platform=linux/arm64 nginx:latest

# Copy the custom nginx.conf file to the appropriate location
COPY nginx.conf /etc/nginx/
COPY common.conf /etc/nginx/

# Copy the Let's Encrypt directory to the appropriate location
COPY letsencrypt /etc/letsencrypt

# Expose ports for HTTP and HTTPS traffic
EXPOSE 80 443

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
