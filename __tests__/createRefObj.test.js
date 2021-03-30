const { createRefObj } = require("../db/utils/createRefObj");

describe("createRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    const data = [];
    const actual = createRefObj(data);
    expect(actual).toEqual({});
  });
  it("returns an object with one title:id pair, when passed data with one object, and a newKey and a newValue", () => {
    const data = [
      {
        article_id: 1,
        title: "Running a Node App",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
      },
    ];
    const actual = createRefObj(data, "title", "article_id");
    const expected = {
      "Running a Node App": 1,
    };
    expect(actual).toEqual(expected);
  });
});
