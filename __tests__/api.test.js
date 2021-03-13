process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const dbConnection = require("../db/dbConnection");

beforeEach(() => dbConnection.seed.run());
afterAll(() => dbConnection.destroy());

describe("/api", () => {
  // API HAPPY PATH ----> SAD PATH END OF THIS DESCRIBE
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
});
describe("articles", () => {
  describe("GET :article_id", () => {
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
  describe("PATCH :article_id", () => {
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
    // (to save time, 400s are not handled with custom http error codes)
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
  });
});
// API SAD PATHS --> unsure how to implement this one
xtest("Status: 404 non-existent endpoint", () => {
  return request(app)
    .get("/api/topicz")
    .expect(404)
    .then(({ text }) => {
      expect(text).toBe("Nothing found on this URL");
    });
});
