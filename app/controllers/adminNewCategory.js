import { firstLetterUpperCase } from "../../assets/script.js";
import { addCategory, getCategories } from "../models/categories.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { adminNewCategoryView } from "../views/adminNewCategory.js";

export function adminNewCategoryController({ request }) {

    const categories = getCategories();

    return render(adminNewCategoryView, { categories }, request, "events-details-page");
}

export async function addNewCategoryController({ request }) {
    const formData = await request.formData();

    const categories = getCategories();
    console.log(categories);
    
    const newCategory = formData.get("new-category-name").trim();

    let message = "";

    if (!newCategory) {
            message = `Input is empty please enter a valid category name.`

            return render(adminNewCategoryView, { categories, message }, request, "events-details-page")
        }

    for (const category of categories) {
        if (category.category_name.toLowerCase() == newCategory.toLowerCase()) {
            message = `The category ${newCategory} already exists please enter a different category.`

            return render(adminNewCategoryView, { categories, message }, request, "events-details-page");
        }
    }

    addCategory(firstLetterUpperCase(newCategory));

    const headers = new Headers();

    return redirect(
        headers, 
        "/events/admin/event-creation-form", 
        `✅ Category "${firstLetterUpperCase(newCategory)}" added successfully!`
    );
}
