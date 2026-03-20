import { getCategories } from "../models/categories.js";

export function required(name, value) {
    if (!value) {
        return `${name} is a required field.`;
    }
}

export function minLength(min) {
    return (name, value) => {
        if (!value) return; // skip if empty (handles optional fields)

        if(value.length < min) {
            return `${name} must have at least ${min} characters.`;
        }
    };
}

export function maxLength(max) {
    return (name, value) => {
        if (!value) return; // skip if empty (handles optional fields)

        if (value.length > max) {
            return `${name} must have at most ${max} characters.`;
        }
    };
}

export function isImageFile(name, value) {
    if (!(value instanceof File)) return `${name} must be a file.`;
    if (!value.type.startsWith('image/')) return `${name} must be an image file.`
}

// validation function to be used in update form and updateEventSchema
export function isImageIfProvided(name, value) {
    // if no file uploaded then skip validation
    if (!value || value.size == 0) return;

    // otherwise validate normally
    if (!(value instanceof File)) return `${name} must be a file.`;
    if (!value.type.startsWith('image/')) return `${name} must be an image file.`
}

export function isPhoneNumber(name, value) {
    if (!value) return; // skip if empty (handles optional fields)

    const phoneRegex = /^\+[0-9]+$/;

    if (!phoneRegex.test(value)) {
        return `Invalid Phone Number: 
        ${name} must start with a + and contain only numbers.`
    }

    // remove + before checking length
    const digitsOnly = value.startsWith("+") ? value.slice(1) : value;

    if (digitsOnly.length != 12) {
        return `Invalid Phone Number:
        ${name} phone number must be exactly 12 digits (excluding +).`
    }
}

export function isEmail(name, value) {
    if (!value) return; // skip if empty (handles optional fields)

    if (!(value.includes("@") && value.includes("."))) {
        return `Invalid Email Address:
        ${name} must be a valid email address with '@' and '.' symbols.`
    }
}

// function to check if the given new category already exists
const categories = getCategories();

export function categoryExists(name, value) {
    for (const category of categories) {
        if (category.category_name.toLowerCase() == value.toLowerCase()) {
            return `${name} "${value}" already exists. Please enter a new category.`
        }
    }
}

export function validateField(name, value, validators) {
    for (const validator of validators) {
        const error = validator(name, value);
        if (error) return error;
    }
}


export function validateSchema(formData, schema) {

    let isValid = true;
    const validated = {};

    const schemaEntries = Object.entries(schema);

    const errorEntries = schemaEntries.map(([key, { validators, displayName }]) => {

        let value = formData.get(key);

        // trim the values if it's a string to remove any trailing spaces
        if (typeof value == "string") {
            value = value.trim();
        }

        const message = validateField(displayName || key, value, validators) || "";

        if (message) {
            isValid = false;
        } else {
            validated[key] = value;
        }

        return [
            key,
            {
                value,
                message,
                error: !!message
            }
        ];
    });

    const errors = Object.fromEntries(errorEntries);

    return { errors, isValid, validated };
}


