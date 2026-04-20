import { getUser } from "../models/users.js";
import { getEventByEventId, getEvents } from "../models/events.js";
import render from "../tools/render.js";
import { registrationView } from "../views/register.js";
import { addRegistration, registrationExists } from "../models/register.js";
import { redirect } from "../tools/redirect.js";

export function registrationController(ctx) {
    const { request, session, errors } = ctx;

    // extract all user information
    const user = getUser(session.username);

    // extracting all events
    const allEvents = getEvents();

    // extract selected event information
    const url = new URL(request.url);

    const pathname = url.pathname;

    const selectedEventId = pathname.split("/")[2];

    const selectedEvent = getEventByEventId(selectedEventId);

    return render(registrationView, { user, allEvents, selectedEventId, selectedEvent, errors }, ctx, "admin-event-forms");
}


export function addRegistrationController(ctx, next) {
    const { isValid, validated, headers, session } = ctx;

    if (!isValid) return next(ctx);

    // getting username
    const username = session.username;

    // getting user provided information (event, student id, phone and year)
    const {
        "event-id": eventId,
        "student-id": studentId,
        phone,
        year
    } = validated;

    //getting info on event
    const event = getEventByEventId(eventId);

    // validating if event doesn't exist
    if (!event) {
        return redirect(headers, "/events/events-homepage", "Event not found")
    }

    // validating if student has already registered for this event
    if (registrationExists(username, eventId)) {
        return redirect(headers, "/register", "Already registered for this event");
    }

    // adding all gathered information into the database
    addRegistration({ username, eventId, studentId, phone, year });

    return redirect(headers, "/events/events-homepage", `Successfully registered for "${event.event_name}"`);
}