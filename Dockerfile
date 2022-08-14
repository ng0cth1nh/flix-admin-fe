FROM node:alpine as build
# set working directory
WORKDIR /app


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./

RUN yarn install

# add app
COPY . ./


RUN yarn build

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html