import { getCategories } from "../models/categories.js";
import { getContactsByEventId } from "../models/contacts.js";
import { getEventById } from "../models/events.js";
import render from "../tools/render.js";
import { eventsDetailsView } from "../views/eventsDetails.js";

export function eventsDetailsController({ request }) {

    const url = new URL(request.url);
    const pathname = url.pathname;

    const eventId = pathname.split("/")[3];

    const events = getEventById(eventId);
    const categories = getCategories();
    const contacts = getContactsByEventId(eventId);

    // assume contacts returns an array of all the info on each contact
    let contact1 = null;
    let contact2 = null;

    if (contacts.length >= 1) {
        contact1 = contacts[0]; // first contact
    }

    if (contacts.length >= 2) {
        contact2 = contacts[1]; // second contact (optional)
    }

    return render(eventsDetailsView, { events, categories, contact1, contact2 }, request, "events-details-page");
}