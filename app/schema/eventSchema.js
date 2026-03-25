import { isEmail, isImageFile, isPhoneNumber, maxLength, minLength, required } from "../tools/validation.js";

export const eventSchema = {

    // Mandatory Fields where data is REQUIRED
    "category-id": {
        validators: [required],
        displayName: "Event category"
    },

    "event-name": {
        validators: [required, minLength(3), maxLength(100)],
        displayName: "Event name"
    },

    "event-date": {
        validators: [required],
        displayName: "Event date"
    },

    "event-short-desc": {
        validators: [required,minLength(3), maxLength(150)],
        displayName: "Event short description"
    },

    "event-image": {
        validators: [required, isImageFile],
        displayName: "Event image"
    },

    "event-long-desc": {
        validators: [required, minLength(150)],
        displayName: "Event long description"
    },

    "registration-deadline": {
        validators: [required],
        displayName: "Registration deadline"
    },

    "event-start-time": {
        validators: [required],
        displayName: "Event start time"
    },

    "event-location": {
        validators: [required],
        displayName: "Event location"
    },

    "contact1-name": {
        validators: [required],
        displayName: "Contact 1 name"
    },

    "contact1-designation": {
        validators: [required],
        displayName: "Contact 1 designation"
    },

    "contact1-phone": {
        validators: [required, isPhoneNumber], 
        displayName: "Contact 1 phone number"
    },

    "contact1-email": {
        validators: [required, isEmail], 
        displayName: "Contact 1 email ID"
    },
    

    // Optional Fields where data is not required
    "section1-title": {
        validators: [minLength(2), maxLength(50)],
        displayName: "Sub-heading 1 title"
    },

    "section1-desc": {
        validators: [minLength(5)],
        displayName: "Sub-heading 1 description"
    },

    "section2-title": {
        validators: [minLength(2), maxLength(50)],
        displayName: "Sub-heading 2 title"
    },

    "section2-desc": {
        validators: [minLength(5)],
        displayName: "Sub-heading 2 description"
    },

    "section3-title": {
        validators: [minLength(2), maxLength(50)],
        displayName: "Sub-heading 3 title"
    },

    "section3-desc": {
        validators: [minLength(5)],
        displayName: "Sub-heading 3 description"
    },

    "contact2-name": {
        validators: [minLength(2)],
        displayName: "Contact 2 name"
    },

    "contact2-designation": {
        validators: [minLength(2)],
        displayName: "Contact 2 designation"
    },

    "contact2-phone": {
        validators: [isPhoneNumber], 
        displayName: "Contact 2 phone number"
    },

    "contact2-email": {
        validators: [isEmail], 
        displayName: "Contact 2 email ID"
    }
};