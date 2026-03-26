import { firstLetterUpperCase } from "../../assets/script.js";
import { addCategory, getCategories } from "../models/categories.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { adminNewCategoryView } from "../views/adminNewCategory.js";

export function adminNewCategoryController(ctx) {
    const { errors } = ctx;

    const categories = getCategories();

    return render(adminNewCategoryView, { categories, errors }, ctx, "admin-event-forms");
}

export function addNewCategoryController(ctx, next) {
    const { headers, isValid, validated } = ctx;

    // validating user provided input
    if (!isValid) return next(ctx);

    const newCategory = validated["new-category-name"];

    addCategory(firstLetterUpperCase(newCategory));

    return redirect(
        headers, 
        "/events/admin/event-creation-form", 
        `✅ Category "${firstLetterUpperCase(newCategory)}" added successfully!`
    );
}
