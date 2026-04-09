import { minLength, required } from "../tools/validation.js";

export const loginSchema = {
    username: {validators: [required, minLength(8)] },
    password: {validators: [required, minLength(12)] }
} 