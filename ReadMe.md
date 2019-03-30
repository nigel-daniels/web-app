# My Web App Template

This project is a Node/Express server that serves a React/Redux client.  It functions as a basic app example but with rich, ready to go, features. From [Initiate Thinking](https://www.initiatethinking.com).

## Generating SSL Keys
The key and certificate referenced were generated using the following pair of commands from within the config directory:

```
openssl req -newkey rsa:2048 -new -nodes -keyout test-key.pem -out test-csr.pem
openssl x509 -req -days 365 -in test-csr.pem -signkey test-key.pem -out test-crt.crt
```

## Setting up for email
You will need to edit the file `config/mail.bak.js` to use your own email credentials, then save the file as `config/mail.js`.

## Docker development
This was mostly developed in a docker environment so doing `docker-compose up` in the main directory gets the development environment up and running, it just keeps my main environment clean when working on multiple projects.  The docker directory has the setup for the base container so check the doc there for getting that going.

## package.jsons
There are multiple package.json files, the one in the root is there just to enable the scripts needed and to provide some of the dev tools the scripts use.  Both the client and the server contain their own package.json files (and webpack configs, etc.).
