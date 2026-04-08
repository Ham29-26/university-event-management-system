import render from "../tools/render.js";
import { registrationFormView } from "../views/auth.js";

export function registrationFormController(ctx) {
    return render(registrationFormView, {}, ctx)
}

export async function addUsersController(ctx) {
    const { formData } = ctx;
    const username = formData.get("username");
    const password = formData.get("password");

    // validate the incoming data here
    

    // create the user record here
    console.log("new user: ", username);
    console.log("password: ", password);
    
}