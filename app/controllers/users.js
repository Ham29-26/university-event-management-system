import { createUser } from "../models/users.js";
import { login } from "../tools/auth.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { signUpView } from "../views/auth.js";

export function signUpController(ctx) {
    const { errors } = ctx;

    return render(signUpView, { errors }, ctx, "admin-event-forms")
}

export async function addUserController(ctx, next) {
    const { isValid, validated, headers } = ctx;
    if (!isValid) return next(ctx);

    await createUser({
        ...validated,
        role: "student"
    });

    login(headers, {
        username: validated.username,
        role: "student"
    });

    return redirect(headers, "/events/events-homepage", `Student '${validated.username}' account created`);
}