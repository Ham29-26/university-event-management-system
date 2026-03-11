import { getCategories } from "../models/categories.js";
import { getEvents } from "../models/events.js";
import render from "../tools/render.js";
import { eventsHomeView } from "../views/eventsHome.js";

export function eventsHomeController({ request }) {

    let events = getEvents();
    const categories = getCategories();

    const url = new URL(request.url);
    const searchItem = url.searchParams.get("search-student");

    if(searchItem != null) {
        events = events.filter(event => 
            event.event_name.toLowerCase().includes(searchItem.toLowerCase().trim())
        );
    }

    return render(eventsHomeView, { events, categories, searchItem }, request, "events-homepage");
}
