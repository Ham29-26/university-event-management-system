import render from "../tools/render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundController(ctx) {
    const { session } = ctx;
    ctx.status = 404;
    return render(notFoundView, { session }, ctx, "not-found-page");
}