import { useNavigate } from "react-router-dom";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import recipeService from "../../utils/recipeService";
import type { RecipeInput } from "../../shared.types";
import styles from "./CreateRecipePage.module.css";

function CreateRecipePage() {
  const navigate = useNavigate();

  async function handleSubmit(recipe: RecipeInput) {
    await recipeService.create(recipe);
    navigate("/dashboard");
  }

  return (
    <div className={styles.page}>
      <h1>Create a Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} submitLabel="Create Recipe" />
    </div>
  );
}

export default CreateRecipePage;
