import { getAllRegistrations, getRegistrationsByUser } from "../models/register.js";
import render from "../tools/render.js";
import { adminRegistrationsView, studentRegistrationsView } from "../views/registrations.js";

export function studentRegistrationsController(ctx) {
    const { session } = ctx;

    const registrations = getRegistrationsByUser(session.username);

    return render(studentRegistrationsView, { registrations }, ctx);
}

export function adminRegistrationsController(ctx) {
    const registrations = getAllRegistrations();

    return render(adminRegistrationsView, { registrations }, ctx);
}