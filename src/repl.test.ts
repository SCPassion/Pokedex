import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

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

