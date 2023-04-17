import { capitalCase } from "./stringManipulation";

describe("capitalCase", () => {
  it("should capitalise a letter when given a one letter string", () => {
    expect(capitalCase("a")).toBe("A");
  });
  it("should return a word capitalised when given a string of one word", () => {
    expect(capitalCase("hello")).toBe("Hello");
  });
  it("Should return each word capitalised when given a string with multiple words", () => {
    expect(capitalCase("hello world I am Kamal")).toBe(
      "Hello World I Am Kamal"
    );
  });
  it("should not have a problem with special characters", () => {
    expect(capitalCase("3989fkjk-jfksd yes")).toBe("3989fkjk-jfksd Yes");
  });
});
