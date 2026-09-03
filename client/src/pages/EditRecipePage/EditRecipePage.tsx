import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import recipeService from "../../utils/recipeService";
import type { Recipe, RecipeInput } from "../../shared.types";
import styles from "./EditRecipePage.module.css";

function EditRecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    recipeService.getOne(id).then(setRecipe);
  }, [id]);

  async function handleSubmit(updated: RecipeInput) {
    if (!id) return;
    await recipeService.update(id, updated);
    navigate("/dashboard");
  }

  if (!recipe) return <p className={styles.page}>Loading...</p>;

  return (
    <div className={styles.page}>
      <h1>Edit Recipe</h1>
      <RecipeForm
        initialValues={recipe}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditRecipePage;
