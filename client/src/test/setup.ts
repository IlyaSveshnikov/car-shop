import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Чистим DOM и localStorage между тестами, чтобы сторы не «протекали» друг в друга.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
