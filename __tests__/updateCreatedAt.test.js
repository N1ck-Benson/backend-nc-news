const { updateCreatedAt } = require("../db/utils/updateCreatedAt");

describe("updateCreatedAt", () => {
  it("returns an empty array when passed an empty array", () => {
    const input = [];
    const actual = updateCreatedAt(input);
    expect(actual).toEqual([...input]);
  });
  it("returns an array with one object with a reformatted created_at key", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];

    const actual = updateCreatedAt(input);
    let typeOfOutput = typeof actual[0].created_at;
    expect(typeOfOutput).toBe("object");
  });
  it("returns an array with multiple objects with reformatted created_at keys", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
      },
    ];

    const actual = updateCreatedAt(input);
    let typeOfOutput = typeof actual[0].created_at;
    expect(typeOfOutput).toBe("object");
    typeOfOutput = typeof actual[1].created_at;
    expect(typeOfOutput).toBe("object");
  });
});
