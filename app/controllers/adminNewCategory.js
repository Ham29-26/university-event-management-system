import { firstLetterUpperCase } from "../../assets/script.js";
import { addCategory, getCategories } from "../models/categories.js";
import { newCategorySchema } from "../schema/newCategorySchema.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { validateSchema } from "../tools/validation.js";
import { adminNewCategoryView } from "../views/adminNewCategory.js";

export function adminNewCategoryController({ request }) {

    const categories = getCategories();

    return render(adminNewCategoryView, { categories }, request, "events-details-page");
}

export async function addNewCategoryController({ request }) {
    const formData = await request.formData();

    // first validating all input and proceeding ahead only if they are valid
    // else will return a 400 status and present an error message
    const { isValid, errors, validated } = validateSchema(formData, newCategorySchema);
    
    if (!isValid) {
        return render(adminNewCategoryView, { errors }, request, "events-details-page", 400);
    }

    const newCategory = validated["new-category-name"];

    addCategory(firstLetterUpperCase(newCategory));

    const headers = new Headers();

    return redirect(
        headers, 
        "/events/admin/event-creation-form", 
        `✅ Category "${firstLetterUpperCase(newCategory)}" added successfully!`
    );
}
