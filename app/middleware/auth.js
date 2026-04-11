import { currentSession } from "../tools/auth.js";
import { redirect } from "../tools/redirect.js";

export function withSession(ctx, next) {
    const { request } = ctx;
    ctx.session = currentSession(request.headers);
    console.log(ctx.session ? `logged in as ${ctx.session.username}` : "No session found");
    return next(ctx);
}

export function requiresSession(ctx, next) {
    const { session, headers } = ctx;
    if(!session) {
        console.log("Access denied to protected route");
        return redirect(headers, "/login", "Sign in to gain access");
    }
    console.log("Access granted");
    return next(ctx);
}

export function requiresAdmin(ctx, next) {
    const { session, headers } = ctx;

    if (!session) {
        return redirect(headers, "/admin-login", "Sign in as admin to gain access");
    }

    if (session.role !== "admin") {
        console.log("Non-admin tried to access admin route");
        return redirect(headers, "/events/events-homepage", "Admin access only");
    }

    return next(ctx);
}

export function excludesSession(ctx, next) {
    const { session, headers } = ctx;
    if(session && session.role == "student") {
        console.log("Access denied to logged in user");
        return redirect(headers, "/events/events-homepage", "Sign out to gain access");

    } else if(session && session.role == "admin") {
        console.log("Access denied to logged in user");
        return redirect(headers, "/events/admin/events-homepage", "Sign out to gain access");
    }

    console.log("Access granted");
    return next(ctx);
}