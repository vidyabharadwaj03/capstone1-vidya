import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import recipeService from "../../utils/recipeService";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../components/Toast/Toast";
import type { Recipe } from "../../shared.types";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Recipe | null>(null);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  function loadRecipes() {
    recipeService.getAll().then((all) => {
      setRecipes(all.filter((recipe) => recipe.ownerId === user?._id));
    });
  }

  useEffect(() => {
    loadRecipes();
  }, [user]);

  async function handleDelete() {
    if (!deleteTarget) return;
    await recipeService.delete(deleteTarget._id);
    setDeleteTarget(null);
    setToast("Recipe deleted");
    loadRecipes();
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <div className={styles.page}>
      <p>Welcome back, {user?.email}. Manage your recipes or create a new one.</p>
      <h1>Your Recipes</h1>
      {recipes.length === 0 ? (
        <div className={styles.empty}>
          <p>Your recipes will show up here.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onEdit={() => navigate(`/dashboard/recipes/${recipe._id}/edit`)}
              onDelete={() => setDeleteTarget(recipe)}
            />
          ))}
        </div>
      )}
      <Link to="/dashboard/recipes/new" className={styles.createBtn}>
        Create Recipe
      </Link>
      <Link to="/recipes" className={styles.browseBtn}>
        Browse Recipes
      </Link>
      {deleteTarget ? (
        <ConfirmDialog
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      ) : null}
      <Toast message={toast} />
    </div>
  );
}

export default DashboardPage;
