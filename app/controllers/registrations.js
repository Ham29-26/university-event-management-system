import { getEvents } from "../models/events.js";
import { getAllRegistrations, getRegistrationsByEvent, getRegistrationsByUser } from "../models/register.js";
import render from "../tools/render.js";
import { adminRegistrationsView, studentRegistrationsView } from "../views/registrations.js";

export function studentRegistrationsController(ctx) {
    const { session } = ctx;

    const registrations = getRegistrationsByUser(session.username);

    return render(studentRegistrationsView, { registrations }, ctx);
}

export function adminRegistrationsController(ctx) {
    const { request } = ctx;
    
    const url = new URL(request.url);
    const eventId = url.searchParams.get("event-id");

    let registrations;

    if (eventId) {
        registrations = getRegistrationsByEvent(eventId);
    } else {
        registrations = getAllRegistrations();
    }

    const events = getEvents();

    // GROUPING BY EVENT NAME
    const grouped = {};

    for (const reg of registrations) {
        const key = reg.event_name;

        if (!grouped[key]) {
            grouped[key] = [];
        }

        grouped[key].push(reg);
    }

    return render(adminRegistrationsView, { 
        groupedRegistrations: grouped,
        events,
        selectedEventId: eventId
    }, ctx);
}