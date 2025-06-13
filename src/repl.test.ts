import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe.each([
  // Here you can define the input and expected output pairs for the cleanInput function
  {
    input: " hello world ",
    expected: ["hello", "world"],
  },
])("cleanInput", ({ input, expected }) => {
  // This defines a test suite for the cleanInput function
  test(`Expected: ${expected}`, () => {
    // Get the actual output for the given input
    const actual = cleanInput(input);

    // Check if the actual output matches the expected output
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).toBe(expected[i]);
    }
    // Ensure the length of the actual output matches the expected length
    expect(actual).toHaveLength(expected.length);
  });

  // This defines another test to check the type of the input
  test(`Input: ${input}`, () => {
    expect(input).toBeTypeOf("string");
  });
});

test.concurrent.each([{
  key: "https://example.com",
  val: "testdata",
  interval: 500,
}, {
  key: "https://example.com/path",
  val: "moretestdata",
  interval: 1000,
}])("Test caching $Interval ms", async ({key, val, interval}) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cachedValue = cache.get(key);
  expect(cachedValue).toBe(val);

  await new Promise(resolve => setTimeout(resolve, interval + 100));
  const expiredValue = cache.get(key);
  expect(expiredValue).toBeUndefined();
  
  cache.stopReapLoop();
})