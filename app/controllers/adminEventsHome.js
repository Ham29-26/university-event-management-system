import { getEvents } from "../models/events.js";
import render from "../tools/render.js";
import { adminEventsHomeView } from "../views/adminEventsHome.js";

export function adminEventsHomeController({ request }) {
    let events = getEvents();
    
    const url = new URL(request.url);
    const searchItem = url.searchParams.get("search-admin");
    
    if(searchItem != null) {
        events = events.filter(event => 
        event.event_name.toLowerCase().includes(searchItem.toLowerCase().trim())
        );
    }
    
    return render(adminEventsHomeView, { events, searchItem }, request, "events-homepage");
}