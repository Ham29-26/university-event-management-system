import { getContactsByEventId } from "../models/contacts.js";
import { getEventByEventId } from "../models/events.js";
import render from "../tools/render.js";
import { adminEventsDetailsView } from "../views/adminEventsDetails.js";

export function adminEventsDetailsController(ctx) {
    const { request } = ctx;

    const url = new URL(request.url);
    const pathname = url.pathname;

    const eventId = pathname.split("/")[4];

    const events = getEventByEventId(eventId);
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

    return render(adminEventsDetailsView, { events, contact1, contact2 }, ctx, "events-details-page");
}