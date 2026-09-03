import { useCallback, useEffect, useState } from "react";
import recipeService from "../../utils/recipeService";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import type { Recipe } from "../../shared.types";
import styles from "./BrowseRecipesPage.module.css";

function BrowseRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recipeService.getAll().then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    const data = await recipeService.getAll({
      title: query,
      tag: query,
      ingredient: query,
    });
    setRecipes(data);
    setLoading(false);
  }, []);

  return (
    <div className={styles.page}>
      <h1>Recipe List</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No matching recipes found.</p>
      ) : (
        <div className={styles.grid}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseRecipesPage;
