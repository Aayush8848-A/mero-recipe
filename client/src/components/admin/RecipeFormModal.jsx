import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../common/button";

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Other",
];

const RecipeFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  recipe = null,
  isLoading = false,
}) => {
  const isEdit = !!recipe;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "Lunch",
      cookingTime: 30,
      servings: 2,
      ingredients: [{ value: "" }],
      instructions: [{ value: "" }],
      isPublished: false,
      isFeatured: false,
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({ control, name: "instructions" });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Load recipe data when editing
  useEffect(() => {
    if (isOpen && recipe) {
      reset({
        title: recipe.title || "",
        description: recipe.description || "",
        category: recipe.category || "Lunch",
        cookingTime: recipe.cookingTime || 30,
        servings: recipe.servings || 2,
        ingredients:
          recipe.ingredients?.length > 0
            ? recipe.ingredients.map((i) => ({ value: i }))
            : [{ value: "" }],
        instructions:
          recipe.instructions?.length > 0
            ? recipe.instructions.map((i) => ({ value: i }))
            : [{ value: "" }],
        isPublished: recipe.isPublished ?? false,
        isFeatured: recipe.isFeatured ?? false,
      });
      setImagePreview(
        recipe.recipeImage
          ? `http://localhost:5000/api/v1/uploads/${recipe.recipeImage}`
          : "",
      );
    } else if (isOpen && !recipe) {
      reset({
        title: "",
        description: "",
        category: "Lunch",
        cookingTime: 30,
        servings: 2,
        ingredients: [{ value: "" }],
        instructions: [{ value: "" }],
        isPublished: false,
        isFeatured: false,
      });
      setImagePreview("");
      setImageFile(null);
    }
  }, [isOpen, recipe, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("category", data.category);
    formData.append("cookingTime", data.cookingTime);
    formData.append("servings", data.servings);
    formData.append(
      "ingredients",
      JSON.stringify(data.ingredients.map((i) => i.value).filter(Boolean)),
    );
    formData.append(
      "instructions",
      JSON.stringify(data.instructions.map((i) => i.value).filter(Boolean)),
    );
    formData.append("isPublished", data.isPublished);
    formData.append("isFeatured", data.isFeatured);
    if (imageFile) formData.append("recipeImage", imageFile);

    onSubmit(formData);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50
          shadow-2xl flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold text-brand-orange uppercase tracking-widest">
              {isEdit ? "Edit Recipe" : "New Recipe"}
            </p>
            <h2 className="text-xl font-bold text-brand-green mt-0.5">
              {isEdit ? recipe.title : "Add a new dish"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-brand-green mb-2">
              Recipe Image
            </label>
            <label className="block relative w-full h-40 rounded-2xl border-2 border-dashed border-gray-200 hover:border-brand-orange transition-colors cursor-pointer overflow-hidden group">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      Change image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg
                    className="w-10 h-10 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Click to upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <Field label="Title" required error={errors.title?.message}>
            <input
              type="text"
              placeholder="e.g., Chicken Biryani"
              className={inputClass(errors.title)}
              {...register("title", { required: "Title is required" })}
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={3}
              placeholder="A short, appetizing description..."
              className={`${inputClass()} resize-none`}
              {...register("description")}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Category" required>
              <select
                className={inputClass(errors.category)}
                {...register("category", { required: true })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Cooking Time (min)" required>
              <input
                type="number"
                min={1}
                className={inputClass(errors.cookingTime)}
                {...register("cookingTime", {
                  required: true,
                  min: { value: 1, message: "Must be at least 1" },
                })}
              />
            </Field>

            <Field label="Servings" required>
              <input
                type="number"
                min={1}
                className={inputClass(errors.servings)}
                {...register("servings", {
                  required: true,
                  min: { value: 1, message: "Must be at least 1" },
                })}
              />
            </Field>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-brand-green">
                Ingredients <span className="text-brand-orange">*</span>
              </label>
              <button
                type="button"
                onClick={() => appendIngredient({ value: "" })}
                className="text-xs font-bold text-brand-orange hover:underline"
              >
                + Add ingredient
              </button>
            </div>
            <div className="space-y-2">
              {ingredientFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green text-xs font-bold shrink-0">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., 2 cups basmati rice"
                    className={inputClass()}
                    {...register(`ingredients.${index}.value`)}
                  />
                  {ingredientFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-brand-green">
                Instructions <span className="text-brand-orange">*</span>
              </label>
              <button
                type="button"
                onClick={() => appendInstruction({ value: "" })}
                className="text-xs font-bold text-brand-orange hover:underline"
              >
                + Add step
              </button>
            </div>
            <div className="space-y-2">
              {instructionFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="w-7 h-7 mt-2.5 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange text-xs font-bold shrink-0">
                    {index + 1}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Describe this step..."
                    className={`${inputClass()} resize-none`}
                    {...register(`instructions.${index}.value`)}
                  />
                  {instructionFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className="w-8 h-8 mt-2.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <ToggleField
              label="Publish"
              description="Show on the public site"
              register={register("isPublished")}
              color="green"
            />
            <ToggleField
              label="Feature"
              description="Highlight on the home page"
              register={register("isFeatured")}
              color="orange"
            />
          </div>
        </form>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <Button
            onClick={handleSubmit(onFormSubmit)}
            variant="primary"
            size="md"
            isLoading={isLoading}
          >
            {isEdit ? "Save Changes" : "Create Recipe"}
          </Button>
        </div>
      </div>
    </>
  );
};

/* ============ Helper Components ============ */

const inputClass = (error) =>
  `w-full px-4 py-2.5 rounded-xl bg-white border-2 text-sm text-brand-green placeholder-gray-400 transition-all focus:outline-none ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-leaf/20"
  }`;

const Field = ({ label, required, error, children }) => (
  <div>
    {label && (
      <label className="block text-sm font-semibold text-brand-green mb-2">
        {label} {required && <span className="text-brand-orange">*</span>}
      </label>
    )}
    {children}
    {error && (
      <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
    )}
  </div>
);

const ToggleField = ({ label, description, register, color }) => {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only"
        {...register}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <div
        className={`
          w-10 h-6 rounded-full relative shrink-0 mt-0.5 transition-colors
          ${checked ? (color === "green" ? "bg-brand-leaf" : "bg-brand-orange") : "bg-gray-300"}
        `}
      >
        <div
          className={`
            absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all
            ${checked ? "left-4.5" : "left-0.5"}
          `}
        />
      </div>
      <div>
        <p className="text-sm font-bold text-brand-green">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </label>
  );
};

export default RecipeFormModal;
