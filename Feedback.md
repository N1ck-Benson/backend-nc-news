# Feedback

## CODE

### migrations

Look good, just make sure you get rid of the logs once you're finished.
--> DONE

### seeding

Also looking good!
--> DONE

### utils

these are all ok, formatComments isn't tested though!
--> test formatComments

### app

Feel free to extract the error handling middleware to a separate folder, so app is looking clean and tidy! Works ok this way too tho.
--> DONE

### routes

good work thus far!

### controllers

these are looking ok! as the controllers are the ones responsible for receiving the request and sending the response, we would say best practice is to handle the data manipulation at model level, like changing the key of count to be a number, but this isnt a major issue, just something you may want to keep in mind and refactor later on
--> move data manipulation to models

### models

nice work error handling as you go! makes it much easier to know that an end point is done!
--> for hosting/portfolio: extend use of custom errors

### errors

good separation of error handling functionality!

### misc

well structured code! what you have good is good, so all you need to do is continue with the endpoints in the same methodical manner.

## Test output

This is the output from our test suite. Most of those relate to endpoints you have yet to attempt, or error handling you will be moving onto later. Please use the below as inspiration for your own tests and to direct you in the right way.

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### PATCH `/api/topics`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### GET `/api/articles`

Assertion: expected 404 to equal 200

Hints:

- use a 200 status code

### GET `/api/articles`

Assertion: expected {} to contain key 'articles'

Hints:

- send articles to the client in an object, with a key of articles: `{ articles: [] }`
- use the data from the `test-data` in your tests

### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:

- the default sort should be by `created_at` and the default order should be `desc`

### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:

- add a `comment_count` property to each article
- join to the `comments` table, as this information lives there
- use an aggregate `COUNT` function
- use `GROUP BY` to avoid duplicate rows

### GET `/api/articles?sort_by=author`

Assertion: Cannot read property '0' of undefined

Hints:

- accept a `sort_by` query, with a value of any column name
- use `author` for the column to store the username that created the article

### GET `/api/articles?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:

- accept an `order` query of `asc` or `desc`

### GET `/api/articles?author=butter_bridge`

Assertion: Cannot read property 'every' of undefined

Hints:

- accept an `author` query of any author that exists in the database
- use `where` in the model

### GET `/api/articles?topic=mitch`

Assertion: Cannot read property 'every' of undefined

Hints:

- accept an `topic` query of any topic slug that exists in the database
- use `where` in the model

### GET `/api/articles?author=lurker`

Assertion: expected 404 to equal 200

Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the user exists

### GET `/api/articles?topic=paper`

Assertion: expected 404 to equal 200

Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists

### GET `/api/articles?sort_by=not-a-column`

Assertion: expected 404 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### GET `/api/articles?order=not-asc-or-desc`

Assertion: expected 404 to be one of [ 200, 400 ]

Hints:

- filter out invalid `order` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles in the default order _OR_ use a 400 and provide a useful message to the client

### PATCH `/api/articles`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PUT `/api/articles/1`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PATCH `/api/articles/1`

Assertion: expected 500 to equal 400

Hints:

- use a 400: Bad Request status code when sent an invalid `inc_votes` value

### GET `/api/articles/1/comments`

Assertion: expected 404 to equal 200

Hints:

- use a 200: OK status code for a successful `GET` request

### GET `/api/articles/1/comments`

Assertion: expected undefined to be an array

Hints:

- send comments in an array, with a key of `comments`

### GET `/api/articles/1/comments`

Assertion: Cannot read property '0' of undefined

Hints:

- send comments to the client in an object, with a key of comments: `{ comments: [] }`
- use `author` for the column to store the username that created the comment
- each comment does not need a key of `article_id`
- use the data from the `test-data` in your tests

### GET `/api/articles/1/comments`

Assertion: Cannot read property '0' of undefined

Hints:

- sort comments by `created_at` by default
- order should default to `DESC`

### GET `/api/articles/1/comments?sort_by=votes`

Assertion: Cannot read property '0' of undefined

Hints:

- accept a `sort_by` query of any valid column
- order should default to `DESC`

### GET `/api/articles/1/comments?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:

- accept an `order` query of `asc` or `desc`
- `sort_by` should default to `created_at`

### GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

### GET `/api/articles/not-a-valid-id/comments`

Assertion: expected 404 to equal 400

Hints:

- return 400: Bad Request when given an invalid `article_id`

### GET `/api/articles/1/comments?order=not-a-valid-order`

Assertion: expected 404 to be one of [ 200, 400 ]

Hints:

- filter out invalid `order` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles in the default order _OR_ use a 400 and provide a useful message to the client

### GET `/api/articles/1/comments?sort_by=not-a-valid-column`

Assertion: expected 404 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### PUT `/api/articles/1/comments`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### POST `/api/articles/1/comments`

Assertion: expected 404 to equal 201

Hints:

- use a 201: Created status code for a successful `POST` request

### POST `/api/articles/1/comments`

Assertion: expected {} to contain key 'comment'

Hints:

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README

### POST `/api/articles/1/comments`

Assertion: Cannot read property 'votes' of undefined

Hints:

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations

### POST `/api/articles/1/comments`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns

### POST `/api/articles/not-a-valid-id/comments`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request when `POST` contains an invalid article_id

### PATCH `/api/comments/1`

Assertion: expected 404 to equal 200

Hints:

- use a 200: OK status code for successful `patch` requests

### PATCH `/api/comments/1`

Assertion: expected {} to contain key 'comment'

Hints:

- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`

### PATCH `/api/comments/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/comments/1`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request status code when sent an invalid `inc_votes` value

### PATCH `/api/comments/1`

Assertion: expected 404 to equal 200

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body

### PATCH `/api/comments/not-a-valid-id`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request when `PATCH` contains an invalid comment_id

### PATCH `/api/comments/1`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request status code when sent an invalid `inc_votes` value

### PUT `/api/comments/1`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### DELETE `/api/comments/1`

Assertion: expected 404 to equal 204

Hints:

- use a 204: No Content status code
- do not return anything on the body

### DELETE `/api/comments/not-a-number`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request when `DELETE` contains an invalid comment_id

### PUT `/api/users/butter_bridge`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### DELETE `/api`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code
