import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

// test files with .test.ts extension are automatically recognized by Vitest
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
  expect(expiredValue).toBe(undefined);
  
  cache.stopReapLoop();
})