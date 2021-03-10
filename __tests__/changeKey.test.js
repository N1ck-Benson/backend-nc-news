const { changeKey } = require("../db/utils/changeKey");

describe("changeKey", () => {
  it("returns an empty array when passed an empty array", () => {
    const input = [];
    const actual = changeKey(input);
    expect(actual).toEqual([...input]);
  });
  it("returns an array with one updated object when passed an array with one object", () => {
    const datas = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    const keyToChange = "created_by";
    const newKey = "author";
    const actual = changeKey(datas, keyToChange, newKey);
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        author: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    expect(actual).toEqual(expected);
  });
  it("returns an array with multiple updated objects when passed an array with multiple objects", () => {
    const datas = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const keyToChange = "created_by";
    const newKey = "author";
    const actual = changeKey(datas, keyToChange, newKey);
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        author: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    expect(actual).toEqual(expected);
  });
});
