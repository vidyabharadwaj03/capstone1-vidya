import axios from "axios";
import tokenService from "./tokenService";
import type { Recipe, RecipeInput, RecipeQuery } from "../shared.types";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL ?? ""}/api/recipes/`;

function authHeaders() {
  return { Authorization: `Bearer ${tokenService.getToken()}` };
}

async function getAll(query: RecipeQuery = {}): Promise<Recipe[]> {
  const res = await axios.get(BASE_URL, { params: query });
  return res.data;
}

async function getOne(id: string): Promise<Recipe> {
  const res = await axios.get(BASE_URL + id);
  return res.data;
}

async function create(recipe: RecipeInput): Promise<Recipe> {
  const res = await axios.post(BASE_URL, recipe, { headers: authHeaders() });
  return res.data;
}

async function update(id: string, recipe: RecipeInput): Promise<Recipe> {
  const res = await axios.put(BASE_URL + id, recipe, {
    headers: authHeaders(),
  });
  return res.data;
}

async function deleteRecipe(id: string): Promise<void> {
  await axios.delete(BASE_URL + id, { headers: authHeaders() });
}

export default {
  getAll,
  getOne,
  create,
  update,
  delete: deleteRecipe,
};
