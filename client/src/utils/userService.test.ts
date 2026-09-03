import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import userService from "./userService";
import tokenService from "./tokenService";

vi.mock("axios");

function makeToken(payload: object) {
  const header = btoa(JSON.stringify({ alg: "none" }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.signature`;
}

describe("userService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("signup stores the returned token and returns the user", async () => {
    const token = makeToken({
      user: { _id: "1", email: "a@a.com" },
      exp: Date.now() / 1000 + 1000,
    });
    vi.mocked(axios.post).mockResolvedValue({ data: { token } });

    const user = await userService.signup({
      email: "a@a.com",
      password: "pw",
    });

    expect(user).toEqual({ _id: "1", email: "a@a.com" });
    expect(tokenService.getToken()).toBe(token);
  });

  it("signup throws a friendly error on failure", async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error("network error"));

    await expect(
      userService.signup({ email: "a@a.com", password: "pw" }),
    ).rejects.toThrow("Could not create account. Email may already be taken.");
  });

  it("login stores the returned token and returns the user", async () => {
    const token = makeToken({
      user: { _id: "2", email: "b@b.com" },
      exp: Date.now() / 1000 + 1000,
    });
    vi.mocked(axios.post).mockResolvedValue({ data: { token } });

    const user = await userService.login({
      email: "b@b.com",
      password: "pw",
    });

    expect(user).toEqual({ _id: "2", email: "b@b.com" });
  });

  it("login throws a friendly error on bad credentials", async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error("401"));

    await expect(
      userService.login({ email: "b@b.com", password: "wrong" }),
    ).rejects.toThrow("Bad credentials.");
  });

  it("logout removes the token so getUser returns null", () => {
    const token = makeToken({
      user: { _id: "1", email: "a@a.com" },
      exp: Date.now() / 1000 + 1000,
    });
    tokenService.setToken(token);

    userService.logout();

    expect(userService.getUser()).toBeNull();
  });
});
