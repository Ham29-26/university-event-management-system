import { categoryExists, required } from "../tools/validation.js";

export const newCategorySchema = {

    "new-category-name": {
        validators: [required, categoryExists],
        displayName: "Category"
    }
}