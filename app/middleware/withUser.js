import { getUserByUsername } from "../models/users.js";

export function withUser(ctx, next) {
    if (ctx.session) {
        ctx.user = getUserByUsername(ctx.session.username);
    }
    return next(ctx);
}