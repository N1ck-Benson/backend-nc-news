process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const dbConnection = require("../db/dbConnection");

beforeEach(() => dbConnection.seed.run());
afterAll(() => dbConnection.destroy());

describe("/", () => {
  describe("GET", () => {
    test("Responds with a welcome message", () => {
      return request(app)
      .get("/")
      .then(({body}) => {
        expect(body).toBe(
          "Welcome to the NC News API. Find all our endpoints at https://nc-news-database.herokuapp.com/api"
        );
      })
    })
  })
  describe("/api", () => {
    // API HAPPY PATH ----> SAD PATH END OF THIS DESCRIBE
    describe("GET", () => {
      test("Responds with JSON describing all available endpoints on the API", () => {
        return request(app)
          .get("/api")
          .then(({ body }) => {
            expect(body).toMatchObject({
              "GET /api": expect.any(Object),
              "GET /api/topics": expect.any(Object),
              "GET /api/users/:username": expect.any(Object),
              "GET /api/articles": expect.any(Object),
              "GET /api/articles/:article_id": expect.any(Object),
              "GET /api/articles/:article_id/comments": expect.any(Object),
              "PATCH /api/articles/:article_id": expect.any(Object),
              "POST /api/articles/:article_id/comments": expect.any(Object),
              "DELETE /api/comments/:comment_id": expect.any(Object),
            });
          });
      });
    });
    describe("/topics", () => {
      describe("GET", () => {
        // HAPPY PATH ----> assuming SAD PATH would be handled in API SAD PATH (404)
        test("Status: 200 responds with array of topic objects, each with a slug and a description", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchObject({
                topics: expect.any(Array),
              });
              expect(body.topics[0]).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
              });
            });
        });
      });
    });
    describe("/users", () => {
      describe("GET :username", () => {
        // HAPPY PATH:
        test("Status: 200 and a user object with the correct keys", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchObject({
                user: {
                  username: "butter_bridge",
                  name: "jonny",
                  avatar_url:
                    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                },
              });
            });
        });
        // SAD PATH:
        test("Status: 404 user not found", () => {
          return request(app)
            .get("/api/users/asdfqwer")
            .expect(404)
            .then(({ text }) => {
              expect(text).toBe("Found no user with username asdfqwer");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("GET", () => {
        test("Status: 200, object containing one array of all articles, with correct properties", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchObject({
                articles: expect.any(Array),
              });
              expect(body.articles[0]).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              });
            });
        });
        test("Status: 200, objects in array are sorted by 'created_at' (DESC) by default", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              const first = {
                author: "butter_bridge",
                title: "Living in the shadow of a great man",
                article_id: 1,
                body: "I find this existence challenging",
                topic: "mitch",
                created_at: "2018-11-15T12:21:54.171Z",
                votes: 100,
                comment_count: 13,
              };
              const last = {
                author: "butter_bridge",
                title: "Moustache",
                article_id: 12,
                body: "Have you seen the size of that thing?",
                topic: "mitch",
                created_at: "1974-11-26T12:21:54.171Z",
                votes: 0,
                comment_count: 0,
              };
              expect(body.articles[0]).toMatchObject(first);
              expect(body.articles[11]).toMatchObject(last);
            });
        });
        test("Status: 200, allow sort_by column to be specified with a query, order defaults to DESC", () => {
          return request(app)
            .get("/api/articles?sort_by=votes")
            .expect(200)
            .then(({ body }) => {
              const first = {
                article_id: 1,
                author: "butter_bridge",
                body: "I find this existence challenging",
                comment_count: 13,
                created_at: "2018-11-15T12:21:54.171Z",
                title: "Living in the shadow of a great man",
                topic: "mitch",
                votes: 100,
              };
              const last = {
                article_id: 11,
                author: "icellusedkars",
                body:
                  "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
                comment_count: 0,
                created_at: "1978-11-25T12:21:54.171Z",
                title: "Am I a cat?",
                topic: "mitch",
                votes: 0,
              };
              expect(body.articles[0]).toEqual(first);
              expect(body.articles[11]).toEqual(last);
            });
        });
        test("Status: 200, allow order to be specified by a query, with default sort_by column 'created_at'", () => {
          return request(app)
            .get("/api/articles?order=asc")
            .expect(200)
            .then(({ body }) => {
              const first = {
                author: "butter_bridge",
                title: "Moustache",
                article_id: 12,
                body: "Have you seen the size of that thing?",
                topic: "mitch",
                created_at: "1974-11-26T12:21:54.171Z",
                votes: 0,
                comment_count: 0,
              };
              const last = {
                author: "butter_bridge",
                title: "Living in the shadow of a great man",
                article_id: 1,
                body: "I find this existence challenging",
                topic: "mitch",
                created_at: "2018-11-15T12:21:54.171Z",
                votes: 100,
                comment_count: 13,
              };
              expect(body.articles[0]).toMatchObject(first);
              expect(body.articles[11]).toMatchObject(last);
            });
        });
        test("Status: 200, allow filter for author, specified by a query", () => {
          return request(app)
            .get("/api/articles?filter[author]=butter_bridge")
            .expect(200)
            .then(({ body }) => {
              const articlesArray = body.articles;
              const articlesWithoutAuthor = articlesArray.filter((article) => {
                return article.author !== "butter_bridge";
              });
              expect(articlesArray.length).toBe(3);
              expect(articlesWithoutAuthor.length).toBe(0);
            });
        });
        test("Status: 200, allow filter for topic, specified by a query", () => {
          return request(app)
            .get("/api/articles?filter[topic]=cats")
            .expect(200)
            .then(({ body }) => {
              const articlesArray = body.articles;
              const articlesWithoutTopic = articlesArray.filter((article) => {
                return article.topic !== "cats";
              });
              expect(articlesArray.length).toBe(1);
              expect(articlesWithoutTopic.length).toBe(0);
            });
        });
        test("Status: 400, invalid sort_by column", () => {
          return request(app)
            .get("/api/articles?sort_by=asc")
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Query contains invalid criteria");
            });
        });
        test("Status: 400, invalid sorting order", () => {
          return request(app)
            .get("/api/articles?order=votes")
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Query contains invalid criteria");
            });
        });
        test("Status: 400, invalid filter", () => {
          return request(app)
            .get("/api/articles?filter[votes]=100")
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Query contains invalid criteria");
            });
        });
      });
      describe("GET /:article_id", () => {
        // HAPPY PATH:
        test("Status: 200, responds with article object with correct properties", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchObject({
                article: {
                  author: "butter_bridge",
                  title: "Living in the shadow of a great man",
                  article_id: 1,
                  body: "I find this existence challenging",
                  topic: "mitch",
                  created_at: "2018-11-15T12:21:54.171Z",
                  votes: 100,
                  comment_count: 13,
                },
              });
            });
        });
        // SAD PATH:
        test("Status: 404, not found", () => {
          return request(app)
            .get("/api/articles/5000")
            .expect(404)
            .then(({ text }) => {
              expect(text).toBe("Not found");
            });
        });
        test("Status: 400, bad request", () => {
          return request(app)
            .get("/api/articles/butter_bridge")
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Bad request");
            });
        });
      });
      describe("GET /:article_id/comments", () => {
        test("Status: 200, responds with array of comment objects, each with correct properties", () => {
          // {comments: [{}, {}, etc.]}
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              const expected = {
                comment_id: expect.any(Number),
                author: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                body: expect.any(String),
              };
              expect(body.comments).toEqual(expect.any(Array));
              expect(body.comments[0]).toMatchObject(expected);
              expect(body.comments[1]).toMatchObject(expected);
            });
        });
        test("Status: 200, objects in array are sorted by 'created_at' (DESC) by default", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              const first = {
                author: "butter_bridge",
                comment_id: 2,
                votes: 14,
                created_at: "2016-11-22T12:36:03.389Z",
                body:
                  "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
              };
              const last = {
                author: "butter_bridge",
                comment_id: 18,
                votes: 16,
                created_at: "2000-11-26T12:36:03.389Z",
                body: "This morning, I showered for nine minutes.",
              };
              expect(body.comments[0]).toMatchObject(first);
              expect(body.comments[12]).toMatchObject(last);
            });
        });
        test("Status: 200, allow sort_by column to be specified with a query, order defaults to DESC", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=votes")
            .expect(200)
            .then(({ body }) => {
              const first = {
                author: "icellusedkars",
                comment_id: 3,
                votes: 100,
                created_at: "2015-11-23T12:36:03.389Z",
                body:
                  "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
              };
              const last = {
                author: "icellusedkars",
                comment_id: 4,
                votes: -100,
                created_at: "2014-11-23T12:36:03.389Z",
                body:
                  " I carry a log — yes. Is it funny to you? It is not to me.",
              };
              expect(body.comments[0]).toEqual(first);
              expect(body.comments[12]).toEqual(last);
            });
        });
        test("Status: 200, allow order to be specified by a query, with default sort_by column 'created_at'", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(({ body }) => {
              const first = {
                author: "butter_bridge",
                comment_id: 18,
                votes: 16,
                created_at: "2000-11-26T12:36:03.389Z",
                body: "This morning, I showered for nine minutes.",
              };
              const last = {
                author: "butter_bridge",
                comment_id: 2,
                votes: 14,
                created_at: "2016-11-22T12:36:03.389Z",
                body:
                  "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
              };
              expect(body.comments[0]).toEqual(first);
              expect(body.comments[12]).toEqual(last);
            });
        });
        test("Status: 200, allow sort_by and order queries to be combined to specify both criteria in one request", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=votes&order=asc")
            .expect(200)
            .then(({ body }) => {
              const first = {
                author: "icellusedkars",
                comment_id: 4,
                votes: -100,
                created_at: "2014-11-23T12:36:03.389Z",
                body:
                  " I carry a log — yes. Is it funny to you? It is not to me.",
              };
              const last = {
                author: "icellusedkars",
                comment_id: 3,
                votes: 100,
                created_at: "2015-11-23T12:36:03.389Z",
                body:
                  "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
              };
              expect(body.comments[0]).toEqual(first);
              expect(body.comments[12]).toEqual(last);
            });
        });
        test("Status: 200, serve empty array when no comments exist on that article", () => {
          return request(app)
            .get("/api/articles/3/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).toEqual([]);
            });
        });
        // SAD PATH
        test("Status: 400, invalid article_id", () => {
          return request(app)
            .get("/api/articles/five/comments")
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Bad request");
            });
        });
        test("Status: 400, invalid sort_by column", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=asc")
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Query contains invalid criteria");
            });
        });
        test("Status: 400, invalid sorting order", () => {
          return request(app)
            .get("/api/articles/1/comments?order=votes")
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Query contains invalid criteria");
            });
        });
      });
      describe("PATCH /:article_id", () => {
        // HAPPY PATH:
        test("Status: 200, article successfully updated, responding with updated article", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body).toEqual({
                article: {
                  author: "butter_bridge",
                  title: "Living in the shadow of a great man",
                  article_id: 1,
                  body: "I find this existence challenging",
                  topic: "mitch",
                  created_at: "2018-11-15T12:21:54.171Z",
                  votes: 101,
                },
              });
            });
        });
        // SAD PATH:
        test("Status: 404, article_id not found", () => {
          return request(app)
            .patch("/api/articles/5000")
            .send({ votes: "cat" })
            .expect(404)
            .then(({ text }) => {
              expect(text).toBe("Not found");
            });
        });
        test("Status: 400, invalid article_id", () => {
          return request(app)
            .patch("/api/articles/butter_bridge")
            .send({ votes: "cat" })
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Bad request");
            });
        });
        // (to save time, 400s haven't been handled with custom http error codes)
        test("Status: 400, request body contains a valid field with an invalid value/datatype", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ votes: "cat" })
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Bad request");
            });
        });
        test("Status: 400, missing votes field in request body", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Bad request");
            });
        });
        test("Status: 400, additional invalid fields on request body", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ votes: 1, canapees: 4 })
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Bad request");
            });
        });
      });
      describe("POST /:article_id/comments", () => {
        test("Status: 201, successful post returning posted comment", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "I love this article!" })
            .expect(201)
            .then(({ body }) => {
              expect(body).toMatchObject({
                comment: {
                  body: "I love this article!",
                },
              });
            });
        });
        test("Status: 400, missing required fields", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({})
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Request is missing required fields");
            });
        });
        test("Status: 400, failing schema validation", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ user: "butter_bridge", contents: "I love this article!" })
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Request fields are invalid");
            });
        });
        test("Status: 404, article doesn't exist", () => {
          return request(app)
            .post("/api/articles/5000/comments")
            .send({ user: "butter_bridge", contents: "I love this article!" })
            .expect(404)
            .then(({ text }) => {
              expect(text).toBe("Not found");
            });
        });
        test("Status: 400, invalid article_id", () => {
          return request(app)
            .post("/api/articles/one/comments")
            .send({ user: "butter_bridge", contents: "I love this article!" })
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Bad request");
            });
        });
      });
    });
    describe("/comments", () => {
      describe("DELETE /comments/:comment_id", () => {
        test("Status: 204, no content served when comment successfully deleted", () => {
          return request(app).delete("/api/comments/1").expect(204);
        });
        test("Status: 404, not found", () => {
          return request(app)
            .delete("/api/comments/5000")
            .expect(404)
            .then(({ text }) => {
              expect(text).toBe("Not found");
            });
        });
        test("Status: 400, bad request", () => {
          return request(app)
            .delete("/api/comments/butter_bridge")
            .expect(400)
            .then(({ text }) => {
              expect(text).toBe("Bad request");
            });
        });
      });
    });
    // API SAD PATHS
    test("Status: 404 non-existent endpoint", () => {
      return request(app)
        .get("/api/topicz")
        .expect(404)
        .then(({ text }) => {
          expect(text).toBe("Not found");
        });
    });
  });
})
