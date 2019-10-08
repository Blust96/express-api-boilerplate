# Express API Boilerplate

This boilerplate creates a REST API project based on NodeJS, Express and MongoDB. It handles JWT authentication based on [passport](http://www.passportjs.org/), checking JWT from client request's cookies.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Get started by cloning this project within the folder you want.

### Prerequisites

This project is using [nodemon](https://www.npmjs.com/package/nodemon) which enable server's hotreload on file changes.
You can install it by running the command:

```
npm install -g nodemon
```

Rename `.sample.env` to `.env` and fill the fields with your options

```
# SERVER PORT
PORT=server_port

# MongoDB
DB_DATABASE=database_name
DB_USER=database_user
DB_PASSWORD=database_password
DB_HOST=database_host
DB_PORT=database_port

# JWT SECRET
JWT_SECRET=your_jwt_secret

# COOKIES
COOKIE_NAME=your_cookie_name
COOKIE_SECRET=your_cookie_secret
```

### Run the server

Follow the different step to get a development env running:

Install dependencies

```
npm install
```

Run the server (an npm script is defined to run the server with [nodemon](https://www.npmjs.com/package/nodemon))

```
npm start
```

The server should be running on the defined port in the `.env` file ! :+1:

## Models

### User

* first_name
* last_name
* email
* password

## Routes

### Auth

```
// User register
// Public
POST api/auth/register

// User login
// Public
POST api/auth/login

// User login by token
// Private
POST api/auth/login/token
```

### Users

```
// Get all users
// Public
GET api/users

// Get user by id
// Public
GET api/users/:id

// Update user by id
// Private
PUT api/users/:id

// Delete user by id
// Private
DELETE api/users/:id
```

## Deployment

Feel free to check this [tutorial](https://www.taniarascia.com/node-express-postgresql-heroku/) made by [taniarascia](https://github.com/taniarascia) who wrote a great article about Heroku App deployment.

## Built With

* [Express](https://expressjs.com) - The web framework used
* [MondoDB](https://www.mongodb.com/) - Document database
* [Passport](http://www.passportjs.org/) - Authentication service for NodeJS

## Authors

* **Quentin Bohain** - *Initial work* - [Blust96](https://gitlab.com/Bohain)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://gitlab.com/Bohain/express-api-boilerplate/blob/master/LICENSE.md) file for details

## Acknowledgments

I got inspired from olders project and those articles/repos:
* [Create and Deploy a Node.js, Express, & PostgreSQL REST API to Heroku](https://www.taniarascia.com/node-express-postgresql-heroku/)
* [Social network built with the MERN stack](https://github.com/bradtraversy/devconnector)
* [TypeScript Rest API with Express.js, JWT, Authorization Roles and TypeORM](https://medium.com/javascript-in-plain-english/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4)