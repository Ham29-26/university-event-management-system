import { isEmail, minLength, required, usernameAvailable } from "../tools/validation.js";

export const signUpSchema = {
    username: { validators: [required, minLength(8), usernameAvailable] },
    password: { validators: [required, minLength(12)] },
    name: { validators: [required, minLength(2)] },
    email: { validators: [required, isEmail]}
} 