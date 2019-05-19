FROM node:11.6.0-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm i
COPY . /app
CMD [ "/bin/sh", "entrypoint.sh" ]
