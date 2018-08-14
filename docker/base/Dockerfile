FROM alpine:latest

RUN apk update

RUN apk upgrade

RUN apk --no-progress --no-cache add autoconf automake make nasm gcc g++

RUN apk --no-progress --no-cache add libtool musl-dev zlib zlib-dev

RUN apk --no-progress --no-cache add nodejs npm git python

CMD /bin/sh
