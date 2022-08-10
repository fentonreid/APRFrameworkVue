FROM node:16 as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build


FROM nginx:1.21.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
