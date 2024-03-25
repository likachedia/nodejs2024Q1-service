
FROM node:18-alpine
 
WORKDIR /app

COPY package*.json ./

RUN npm install --force --dev
 
COPY . .
  
RUN npm run build
 
EXPOSE 6000
CMD [  "npm", "run", "start:migrate" ]