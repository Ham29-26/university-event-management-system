import { deleteEvent, getEventById } from "../models/events.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { adminDeleteEventView } from "../views/adminDeleteEvent.js";

export function adminDeleteEventController({ request }) {
    const url = new URL(request.url)

    const pathname = url.pathname;

    const eventId = pathname.split("/")[4];

    const event = getEventById(eventId);

    return render(adminDeleteEventView, { event }, request, "events-homepage");
}

export function addDeleteEventController({ request }) {
    const url = new URL(request.url)

    const pathname = url.pathname;

    const eventId = pathname.split("/")[4];

    deleteEvent(eventId);

    return redirect("/events/admin/events-homepage");
}

