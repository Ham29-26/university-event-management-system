import render from "../tools/render.js";
import { loginFormView } from "../views/auth.js";

export function studentLoginFormController(ctx) {
    return render(() => loginFormView("student"), {}, ctx);
}

export function adminLoginFormController(ctx) {
    return render(() => loginFormView("admin"), {}, ctx);
}

export function addSessionsController(ctx) {
    
}