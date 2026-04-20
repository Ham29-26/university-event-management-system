import { getEventByEventId } from "../models/events.js";
import { deleteRegistration } from "../models/register.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { deleteRegistrationView } from "../views/deleteRegistration.js";

export function deleteRegistrationController(ctx) {
    const { request } = ctx;

    const url = new URL(request.url);

    const pathname = url.pathname;

    const eventId = pathname.split("/")[3];

    const event = getEventByEventId(eventId);

    return render(deleteRegistrationView, { event }, ctx, "admin-event-forms");
}

export function addDeleteRegistrationController(ctx) {
    const { request, headers, session } = ctx;

    const url = new URL(request.url);

    const pathname = url.pathname;

    const eventId = pathname.split("/")[3];

    const username = session.username;

    deleteRegistration({ username, eventId });

    return redirect(headers, "/events/my-registrations", "Registration cancelled")
}