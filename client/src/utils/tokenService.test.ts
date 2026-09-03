import { describe, it, expect, beforeEach } from "vitest";
import tokenService from "./tokenService";

function makeToken(payload: object) {
  const header = btoa(JSON.stringify({ alg: "none" }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.signature`;
}

describe("tokenService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores and retrieves a token", () => {
    const token = makeToken({
      user: { _id: "1", email: "a@a.com" },
      exp: Date.now() / 1000 + 1000,
    });
    tokenService.setToken(token);
    expect(tokenService.getToken()).toBe(token);
  });

  it("removes an expired token", () => {
    const token = makeToken({
      user: { _id: "1", email: "a@a.com" },
      exp: Date.now() / 1000 - 1000,
    });
    tokenService.setToken(token);
    expect(tokenService.getToken()).toBeNull();
  });

  it("decodes the user from a valid token", () => {
    const token = makeToken({
      user: { _id: "1", email: "a@a.com" },
      exp: Date.now() / 1000 + 1000,
    });
    tokenService.setToken(token);
    expect(tokenService.getUserFromToken()).toEqual({
      _id: "1",
      email: "a@a.com",
    });
  });

  it("returns null when there is no token", () => {
    expect(tokenService.getUserFromToken()).toBeNull();
  });

  it("removes the token", () => {
    const token = makeToken({
      user: { _id: "1", email: "a@a.com" },
      exp: Date.now() / 1000 + 1000,
    });
    tokenService.setToken(token);
    tokenService.removeToken();
    expect(tokenService.getToken()).toBeNull();
  });
});
