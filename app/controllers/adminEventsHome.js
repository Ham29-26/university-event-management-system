import { getEvents } from "../models/events.js";
import render from "../tools/render.js";
import { adminEventsHomeView } from "../views/adminEventsHome.js";

export function adminEventsHomeController(ctx) {
    const { request } = ctx;
    
    // storing all the events in the variable 'events' which will be provided to the view
    let events = getEvents();
    
    const url = new URL(request.url);
    const searchItem = url.searchParams.get("search-admin");
    
    // if the user searches for an event then only the matching events will overwrite all the existing ones
    // in the variable 'events'
    if(searchItem != null) {
        events = events.filter(event => 
        event.event_name.toLowerCase().includes(searchItem.toLowerCase().trim())
        );
    }
    
    return render(adminEventsHomeView, { events, searchItem }, ctx, "events-homepage");
}