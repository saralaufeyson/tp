FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/rect-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as prod_img
WORKDIR /app/rect-app
COPY --from=BUILD_IMAGE /app/rect-app/dist /app/rect-app/dist
EXPOSE 5173
COPY package.json .
COPY vite.config.js .
RUN npm install 

CMD ["npm","run","preview"]
