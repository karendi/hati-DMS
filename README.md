# Hati-DMS

[![Build Status](https://travis-ci.org/andela-jmacharia/hati-DMS.svg?branch=develop)](https://travis-ci.org/andela-jmacharia/hati-DMS)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/aef08a388e8547338a3dc6ef9873626d)](https://www.codacy.com/app/jackline-macharia/hati-DMS?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=andela-jmacharia/hati-DMS&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/andela-jmacharia/hati-DMS/branch/develop/graph/badge.svg)](https://codecov.io/gh/andela-jmacharia/hati-DMS)
[![Code Climate](https://codeclimate.com/github/andela-jmacharia/hati-DMS/badges/gpa.svg)](https://codeclimate.com/github/andela-jmacharia/hati-DMS)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)


## Hati-API

A RESTful API for Hati-DMS


### Technologies
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/en/) package manager
* [Express.js](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)


### Installation
* Ensure you have `Node`, `npm or Yarn` and `PostgreSQL` installed
* Clone the defense prep branch `git clone -b ch-backend-defense-prep-142727219 https://github.com/andela-jmacharia/hati-DMS.git`
* Navigate to the project folder `cd hati-DMS`
* Install API `npm install` or `yarn`
* Set database variables in `server/config/Config.json`
* Set a secret key in a .env file eg `SECRET=iwillnotrememberthis`
* Run the app `npm run start:dev`



# API


### Run in Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9407c209ea79d5e10425)

### Available Endpoints

The API Documentation is available [here](https://hatidms.herokuapp.com/api/documentation)

Host: https://hatidms.herokuapp.com

## Roles [`/api/roles`]

| Method     | Endpoint       | Description    |
| :-------   | :---------     | :------------- |
|POST        |/api/roles      |Create role     |
|GET         |/api/roles      |List roles      |
|GET         |/api/roles/:id  |Get role        |
|PUT         |/api/roles/:id  |Update role     |
|DELETE      |/api/roles/:id  |Delete role     |


## Users [`/api/users`]

| Method     | Endpoint                                 | Description         |
| :-------   | :--------------------------------------  | :-------------      |
|POST        |/api/users                                |Create user          |
|GET         |/api/users                                |List users           |
|GET         | /users/?limit={integer}&offset={integer} |Paginated users      |
|POST        |/api/users/login                          |Login user           |
|GET         |/api/users/:id                            |Get user             |
|PUT         |/api/users/:id                            |Update user          |
|DELETE      |/api/users/:id                            |Delete user          |
|GET         |/api/users/:id/documents                  |Get user's documents |
|POST        |/api/users/logout                         |Logout user          |


## Documents [`/api/documents`]

| Method     | Endpoint                                        | Description         |
| :-------   | :--------------------------------------------   | :-------------      |
|POST        |/api/documents                                   |Create document      |
|GET         |/api/documents                                   |List documents       |
|GET         |/api/documents/?limit={integer}&offset={integer} |Paginated documents  |
|GET         |/api/documents/:id                               |Get document         |
|PUT         |/api/documents/:id                               |Update document      |
|DELETE      |/api/documents/:id                               |Delete document      |


## Search [`/api/search`]

| Method     | Endpoint                            | Description         |
| :-------   | :---------------------------------- | :-------------      |
|GET         |/api/search/users/?q={username}      |Search users         |
|GET         |/api/search/documents/?q={doctitle}  |Search documents     |
