FROM base:latest

ENV DEBUG_COLOR=true

RUN mkdir /usr/local/web-app

WORKDIR /usr/local/web-app

COPY package.json /usr/local/web-app/

RUN npm install

RUN mkdir -p client/

WORKDIR /usr/local/web-app/client

COPY client/package.json /usr/local/web-app/client/

RUN npm install

WORKDIR /usr/local/web-app

RUN mkdir -p server/

WORKDIR /usr/local/web-app/server

COPY server/package.json /usr/local/web-app/server/

RUN npm install

WORKDIR /usr/local/web-app

VOLUME /usr/local/web-app

CMD /bin/bash
