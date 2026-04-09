import { checkCredentials } from "../models/users.js";
import { login, logout } from "../tools/auth.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { loginFormView } from "../views/auth.js";

export function studentLoginFormController(ctx) {
    const { errors } = ctx;

    return render(loginFormView, { type: "student", errors }, ctx, "admin-event-forms");
}

export function adminLoginFormController(ctx) {
    const { errors } = ctx;

    return render(loginFormView, { type: "admin", errors }, ctx, "admin-event-forms");
}

export async function addSessionController(ctx, next) {
    const { request, isValid, validated, headers, loginType } = ctx;
    if (!isValid) return next(ctx);

    const url = new URL(request.url);
    const pathname = url.pathname;

    const user = await checkCredentials(validated);

    if (!user && pathname == "/student-login") {
        return redirect(headers, "/student-login", "Invalid Credentials");
    } else if (!user && pathname == "/admin-login") {
        return redirect(headers, "/admin-login", "Invalid Credentials");
    }

    // check type of log in
    if (user.role !== loginType) {
        return redirect(headers, `/${loginType}-login`, "Invalid Credentials")
    }

    login(headers, user.username);

    // ROLE-BASED REDIRECT
    if (user.role === "admin") {
        return redirect(headers, "events/admin/events-homepage", `Admin '${validated.username}' logged in successfully!`);
    } else {
        return redirect(headers, "/", `Student '${validated.username}' logged in successfully!`);
    }
}

export function deleteSessionController(ctx) {
    const { session, headers } = ctx;
    if(session) logout(headers, session.id);
    return redirect(headers, "/", "Logged out successfully");
}