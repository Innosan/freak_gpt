FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files to container
COPY package*.json ./

RUN npm ci

# Copy application code to container
COPY . .

ENV PORT=3000

# Expose port for app
EXPOSE $PORT

# Start app
CMD [ "npm", "start" ]
