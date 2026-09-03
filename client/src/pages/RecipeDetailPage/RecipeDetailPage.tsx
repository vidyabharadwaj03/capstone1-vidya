import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import recipeService from "../../utils/recipeService";
import type { Recipe } from "../../shared.types";
import styles from "./RecipeDetailPage.module.css";

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    recipeService
      .getOne(id)
      .then(setRecipe)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <h1 className={styles.page}>Recipe Not Found!</h1>;
  if (!recipe) return <p className={styles.page}>Loading...</p>;

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>
        <Link to="/">Home</Link> &gt; <Link to="/recipes">Recipe List</Link>{" "}
        &gt; {recipe.title}
      </p>

      <div
        className={styles.image}
        style={{ backgroundImage: `url(${recipe.image})` }}
      />

      <h1>{recipe.title}</h1>

      <h2>Ingredients</h2>
      <ul className={styles.ingredients}>
        {recipe.ingredients.map((ingredient, i) => (
          <li key={i}>
            {ingredient.quantity} {ingredient.name}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol className={styles.instructions}>
        {recipe.instructions.map((instruction) => (
          <li key={instruction.step}>{instruction.description}</li>
        ))}
      </ol>

      <h2>Tags</h2>
      <div className={styles.tags}>
        {recipe.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default RecipeDetailPage;
