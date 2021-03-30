# Welcome to NC News

... a simple API built as part of the backend component of a software engineering bootcamp.

## What is the API for?

The API was primarily a way for me to learn and practice backend Node.js, using tools including PostgreSQL, Knex and Express. In the near future it will meet its other half, a webapp that's going to form a useful and engaging frontend.

## What does the API do?

The API serves news articles and comments to the user, along with metadata relating to those items. It also enables users to post and delete comments on the articles. The news database is a 'dummy' or prefab, provided by my coding bootcamp, Northcoders.

## How do we interact with the API?

Requests to the API can be made as endpoints on the URL [https://nc-news-database.herokuapp.com/]

A full list of available endpoints can be found at [https://nc-news-database.herokuapp.com/api]

# Cloning the repo and running the code

In order to run the source code in this repo yourself, you'll first need to clone the repo. 

You'll also need to have the following dependencies installed:

- Node.js
- PostgreSQL
- Knex
- Express

The minimum version of node.js required for the code to run is 15.2.0.
The other dependencies and their versions are included in the package.json, so you should be able to install them by entering running `npm install` in your terminal.

You will also need a file called knexfile.js. To create this file, you can run `knex init` in the terminal. The knexfile should look like this:

```js
const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news",
    },
  },
  test: {
    connection: {
      database: "nc_news_test",
    },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```


## Seeding the database and starting the API

To populate the news database with the data contained in the /db directory, run `npm seed` in the terminal.

`npm start` will start the API.

