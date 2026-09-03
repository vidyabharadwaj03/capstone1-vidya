import tokenService from "./tokenService";
import type { User } from "../shared.types";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL ?? ""}/api/users/`;

type Credentials = {
  email: string;
  password: string;
};

type ProfileUpdate = {
  email?: string;
  password?: string;
};

function authHeaders() {
  return { Authorization: `Bearer ${tokenService.getToken()}` };
}

async function signup(creds: Credentials): Promise<User | null> {
  try {
    const res = await axios.post(BASE_URL + "signup", creds);
    tokenService.setToken(res.data.token);
  } catch (err) {
    throw new Error("Could not create account. Email may already be taken.");
  }
  return getUser();
}

async function login(creds: Credentials): Promise<User | null> {
  try {
    const res = await axios.post(BASE_URL + "login", creds);
    tokenService.setToken(res.data.token);
  } catch (err) {
    throw new Error("Bad credentials.");
  }
  return getUser();
}

function getUser(): User | null {
  return tokenService.getUserFromToken();
}

function logout(): void {
  tokenService.removeToken();
}

async function updateProfile(data: ProfileUpdate): Promise<User | null> {
  try {
    const res = await axios.patch(BASE_URL + "me", data, {
      headers: authHeaders(),
    });
    tokenService.setToken(res.data.token);
  } catch (err) {
    throw new Error("Could not update profile.");
  }
  return getUser();
}

async function deleteAccount(): Promise<void> {
  await axios.delete(BASE_URL + "me", { headers: authHeaders() });
  tokenService.removeToken();
}

export default {
  signup,
  login,
  getUser,
  logout,
  updateProfile,
  deleteAccount,
};
