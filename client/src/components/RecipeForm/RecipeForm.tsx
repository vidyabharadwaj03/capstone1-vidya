import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent } from "react";
import type { Ingredient, RecipeInput } from "../../shared.types";
import styles from "./RecipeForm.module.css";

type RecipeFormProps = {
  initialValues?: RecipeInput;
  onSubmit: (recipe: RecipeInput) => void;
  submitLabel: string;
};

const emptyRecipe: RecipeInput = {
  title: "",
  description: "",
  image: "",
  ingredients: [{ name: "", quantity: "" }],
  instructions: [{ step: 1, description: "" }],
  tags: [],
};

function RecipeForm({ initialValues, onSubmit, submitLabel }: RecipeFormProps) {
  const [recipe, setRecipe] = useState<RecipeInput>(initialValues ?? emptyRecipe);
  const [tagInput, setTagInput] = useState(initialValues?.tags.join(", ") ?? "");
  const imageInputRef = useRef<HTMLInputElement>(null);

  function updateField(field: keyof RecipeInput, value: string) {
    setRecipe({ ...recipe, [field]: value });
  }

  function handleImageFile(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1000;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas
          .getContext("2d")
          ?.drawImage(img, 0, 0, canvas.width, canvas.height);
        updateField("image", canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function handleImageDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    handleImageFile(e.dataTransfer.files[0] ?? null);
  }

  function handleImageInputChange(e: ChangeEvent<HTMLInputElement>) {
    handleImageFile(e.target.files?.[0] ?? null);
  }

  function updateIngredient(index: number, field: keyof Ingredient, value: string) {
    const ingredients = recipe.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing,
    );
    setRecipe({ ...recipe, ingredients });
  }

  function addIngredient() {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "" }],
    });
  }

  function removeIngredient(index: number) {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, i) => i !== index),
    });
  }

  function updateInstruction(index: number, value: string) {
    const instructions = recipe.instructions.map((inst, i) =>
      i === index ? { ...inst, description: value } : inst,
    );
    setRecipe({ ...recipe, instructions });
  }

  function addInstruction() {
    setRecipe({
      ...recipe,
      instructions: [
        ...recipe.instructions,
        { step: recipe.instructions.length + 1, description: "" },
      ],
    });
  }

  function removeInstruction(index: number) {
    const instructions = recipe.instructions
      .filter((_, i) => i !== index)
      .map((inst, i) => ({ ...inst, step: i + 1 }));
    setRecipe({ ...recipe, instructions });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const tags = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    onSubmit({ ...recipe, tags });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        required
        value={recipe.title}
        onChange={(e) => updateField("title", e.target.value)}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={recipe.description}
        onChange={(e) => updateField("description", e.target.value)}
      />

      <fieldset className={styles.fieldset}>
        <legend>Ingredients</legend>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className={styles.row}>
            <input
              required
              aria-label="Ingredient Name"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, "name", e.target.value)}
            />
            <input
              required
              aria-label="Ingredient Quantity"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) =>
                updateIngredient(index, "quantity", e.target.value)
              }
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeIngredient(index)}
              disabled={recipe.ingredients.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addIngredient}>
          Add Ingredient
        </button>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Instructions</legend>
        {recipe.instructions.map((instruction, index) => (
          <div key={index} className={styles.row}>
            <span className={styles.step}>{instruction.step}.</span>
            <input
              required
              aria-label="Instruction Step"
              placeholder="Step description"
              value={instruction.description}
              onChange={(e) => updateInstruction(index, e.target.value)}
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeInstruction(index)}
              disabled={recipe.instructions.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addInstruction}>
          Add Step
        </button>
      </fieldset>

      <label htmlFor="tags">Tags (comma separated)</label>
      <input
        id="tags"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        placeholder="vegan, salad, healthy"
      />

      <label htmlFor="image">Image</label>
      <div
        className={styles.dropzone}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleImageDrop}
      >
        {recipe.image ? (
          <div className={styles.previewWrap}>
            <img src={recipe.image} alt="" className={styles.preview} />
            <button
              type="button"
              className={styles.changeOverlay}
              onClick={() => imageInputRef.current?.click()}
            >
              Change Photo
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.browseBtn}
            onClick={() => imageInputRef.current?.click()}
          >
            Drag and drop an image, or click to browse
          </button>
        )}
        <input
          id="image"
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleImageInputChange}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        {submitLabel}
      </button>
    </form>
  );
}

export default RecipeForm;
