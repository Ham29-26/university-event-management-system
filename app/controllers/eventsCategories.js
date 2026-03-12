import { getCategories, getCategoriesById } from "../models/categories.js";
import { getEventByCategoryId } from "../models/events.js";
import render from "../tools/render.js";
import { eventsCategoriesView } from "../views/eventsCategories.js";

export function eventsCategoriesController({ request }) {

    const url = new URL(request.url);
    const pathname = url.pathname;

    const categoryId = pathname.split("/")[3];

    const events = getEventByCategoryId(categoryId);

    const categories = getCategories(); 

    const selectedCategory = getCategoriesById(categoryId);
    

    return render(eventsCategoriesView, { events, categories, selectedCategory }, request, "events-homepage");
}