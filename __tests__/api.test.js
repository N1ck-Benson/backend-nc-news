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
  describe("articles", () => {
    describe("GET :article_id", () => {
      // HAPPY PATH:
      test("Status: 200, responds with article object with correct properties", () => {
        // CURRENTLY THROWING AN ERROR IN THE MODEL: KNEX QUERY NOT WORKING
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body).toMatchObject({
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
    });
  });
  // API SAD PATHS --> unsure how to implement this one
  test("Status: 404 non-existent endpoint", () => {
    return request(app)
      .get("/api/topicz")
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe("Nothing found on this URL");
      });
  });
});
