import { getCategories } from "../models/categories.js";
import { getEvents } from "../models/events.js";
import render from "../tools/render.js";
import { eventsHomeView } from "../views/eventsHome.js";

export function eventsHomeController(ctx) {
    const { request } = ctx;

    let events = getEvents();
    const categories = getCategories();

    const url = new URL(request.url);
    const searchItem = url.searchParams.get("search-student");

    // if the user searches for an event then only the matching events will overwrite all the existing ones
    // in the variable 'events'
    if(searchItem != null) {
        events = events.filter(event => 
            event.event_name.toLowerCase().includes(searchItem.toLowerCase().trim())
        );
    }

    return render(eventsHomeView, { events, categories, searchItem }, ctx, "events-homepage");
}
