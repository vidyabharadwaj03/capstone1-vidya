import { Link } from "react-router-dom";
import type { Recipe } from "../../shared.types";
import styles from "./RecipeCard.module.css";

type RecipeCardProps = {
  recipe: Recipe;
  onEdit?: () => void;
  onDelete?: () => void;
};

function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
  const createdDate = new Date(recipe.createdAt).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
  const isOwnerView = Boolean(onEdit || onDelete);

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${recipe.image})` }}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>
          {isOwnerView ? (
            <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
          ) : (
            recipe.title
          )}
        </h3>
        <p className={styles.date}>Created on {createdDate}</p>
        <div className={styles.tags}>
          {recipe.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {isOwnerView ? (
          <div className={styles.ownerActions}>
            <button
              type="button"
              aria-label="Delete recipe"
              className={styles.iconBtn}
              onClick={onDelete}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Edit recipe"
              className={styles.iconBtn}
              onClick={onEdit}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          </div>
        ) : (
          <Link to={`/recipes/${recipe._id}`} className={styles.viewLink}>
            View Recipe
          </Link>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
