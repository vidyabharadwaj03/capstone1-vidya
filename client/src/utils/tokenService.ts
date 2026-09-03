import type { User } from "../shared.types";

type JwtPayload = {
  user: User;
  exp: number;
};

function setToken(token: string): void {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

function getToken(): string | null {
  let token = localStorage.getItem("token");
  if (token) {
    const payload: JwtPayload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      token = null;
    }
  }
  return token;
}

function getUserFromToken(): User | null {
  const token = getToken();
  if (!token) return null;
  const payload: JwtPayload = JSON.parse(atob(token.split(".")[1]));
  return payload.user;
}

function removeToken(): void {
  localStorage.removeItem("token");
}

export default {
  setToken,
  getToken,
  removeToken,
  getUserFromToken,
};
