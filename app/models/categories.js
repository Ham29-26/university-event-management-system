import { db } from "../tools/db.js";

export function getCategories() {
    return db.prepare(`
        SELECT * FROM categories
    `).all();
}

export function getCategoriesById(categoryId) {
    return db.prepare(`
        SELECT category_name FROM categories
        WHERE category_id = ?
    `).get(categoryId);
}


export function addCategory(newCategory) {
    db.prepare(`INSERT INTO categories (category_name) VALUES (?)`).run(newCategory);
}