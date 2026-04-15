import { isPhoneNumber, required } from "../tools/validation.js";

export const registerSchema = {
    "event-id": {
        validators: [required],
        displayName: "Event"
    },

    "student-id": {
        validators: [required],
        displayName: "Student ID"
    },

    "phone": {
        validators: [required, isPhoneNumber],
        displayName: "Phone Number"
    },

    "year": {
        validators: [required],
        displayName: "Year of Study"
    }
}