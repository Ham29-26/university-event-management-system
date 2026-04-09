import { minLength, required, usernameAvailable } from "../tools/validation.js";

export const signUpSchema = {
    username: {validators: [required, minLength(8), usernameAvailable] },
    password: {validators: [required, minLength(12)] }
} 