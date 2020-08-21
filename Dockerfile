FROM node:10.15.3

ADD ./package.json /tmp/

RUN cd /tmp/ && npm install

RUN npm install -g pm2

ADD ./ /code/

RUN cp -r /tmp/node_modules/ /code/

EXPOSE 3002

WORKDIR /code

ENTRYPOINT [ "pm2-docker", "start.js"]