import { deleteEvent, getEventByEventId } from "../models/events.js";
import { deleteImage } from "../tools/imageHelpers.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { adminDeleteEventView } from "../views/adminDeleteEvent.js";

export function adminDeleteEventController(ctx) {
    const { request } = ctx;
    
    const url = new URL(request.url)

    const pathname = url.pathname;

    const eventId = pathname.split("/")[4];

    const event = getEventByEventId(eventId);

    return render(adminDeleteEventView, { event }, ctx, "events-homepage");
}

export function addDeleteEventController(ctx) {
    const { request, headers } = ctx;

    const url = new URL(request.url)

    const pathname = url.pathname;

    const eventId = pathname.split("/")[4];

    // first deleting image from the assets folder before deleting it from the events table
    const event = getEventByEventId(eventId);

    const eventImageLink = event.event_image_link;

    deleteImage(eventImageLink);

    // deleting all information on the event from the database
    deleteEvent(eventId);

    return redirect(
        headers, 
        "/events/admin/events-homepage", 
        `🗑️ Event "${event.event_name}" deleted successfully!`
    );
}

