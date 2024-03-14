
FROM node:18-alpine
 
WORKDIR /app

COPY package*.json ./

RUN npm install --force
 
COPY . .
  
RUN npm run build
 
EXPOSE 6000
HEALTHCHECK --interval=15s --timeout=3s --start-period=15s CMD curl -f 
CMD npx prisma migrate dev && npm run start:dev

