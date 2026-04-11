import render from "../tools/render.js";
import { indexView } from "../views/index.js";

export function indexController(ctx) {
    return render(indexView, {}, ctx);
}