# ChristmasListv2
Inspired by my previous christmasList project.

My family needed a way to share christmas lists with each other so I made this:

a simple SPA for posting and viewing wishlists.

Currently deployed via AWS

- [x] react
- [x] react-router
- [x] express
- [x] pg
- [x] webpack
- [x] bcrypt

Todo:
- [ ] modularize SCSS
- [ ] improve user model - serves needs currently but needs expansion for future features
- [ ] more testing
- [ ] Travis CI
- [ ] general refactoring

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To create a production build:

```sh
npm run build
```

## Running production build

```sh
npm start
```

## Running development build
```sh
npm run dev
```

## Environment variables
```sh
PG_URI
SITE_LOGIN_PASSWORD
JWT_PRIVATE_KEY
RECAPTCHA_SECRET
NODE_ENV (set to blank)
PORT
```
