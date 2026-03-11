import { getCategories } from "../models/categories.js";
import { getCategoryById } from "../models/events.js";
import render from "../tools/render.js";
import { eventsCategoriesView } from "../views/eventsCategories.js";

export function eventsCategoriesController({ request }) {

    const url = new URL(request.url);
    const pathname = url.pathname;

    const categoryId = pathname.split("/")[3];

    const events = getCategoryById(categoryId);
    const categories = getCategories(); 

    return render(eventsCategoriesView, { events, categories }, request, "events-homepage")
}