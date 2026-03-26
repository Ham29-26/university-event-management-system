import { getCategories } from "../models/categories.js";
import { getContactsByEventId, updateContact, addContact, deleteContact } from "../models/contacts.js";
import { getEventByEventId, updateEvent } from "../models/events.js";
import render from "../tools/render.js";
import { adminUpdateEventView } from "../views/adminUpdateEvent.js";
import { redirect } from "../tools/redirect.js";
import { firstLetterUpperCase } from "../../assets/script.js";
import { deleteImage, saveImage } from "../tools/imageHelpers.js";


export function adminUpdateEventController(ctx) {
    const { request, formData, errors } = ctx;
     
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    const eventId = pathname.split("/")[5];
    const selectedCategoryId = pathname.split("/")[4];
    
    const events = getEventByEventId(eventId);
    const categories = getCategories();
    const contacts = getContactsByEventId(eventId);
    
    // assume contacts returns an array of all the info on each contact
    let contact1 = null;
    let contact2 = null;
    
    if (contacts.length >= 1) {
        contact1 = contacts[0]; // first contact
    }
    
    if (contacts.length >= 2) {
        contact2 = contacts[1]; // second contact (optional)
    }

    return render(adminUpdateEventView, { events, categories, selectedCategoryId, contact1, contact2, formData, errors}, ctx, "admin-event-forms");
}


export async function addUpdateEventController(ctx, next) {
    const { request, headers, isValid, validated, formData } = ctx;

    const url = new URL(request.url);
    const pathname = url.pathname;
    
    const eventId = pathname.split("/")[5];

    // Re-fetch contact1 and contact2 (same as in the GET controller)
    const contacts = getContactsByEventId(eventId);
    
    let contact1 = null;
    let contact2 = null;
    
    if (contacts.length >= 1) {
        contact1 = contacts[0]; 
    }
    
    if (contacts.length >= 2) {
        contact2 = contacts[1]; 
    }

    // NOW validation

    // first validating all input and proceeding ahead only if they are valid
    // else will return a 400 status and present an error message
    if (!isValid) return next(ctx);

    // continuing update logic below.....

    // adding new image file if given and removing the old image
    // or else keeping the old image
    const imageFile = validated["event-image"];

    const event = getEventByEventId(eventId);

    const eventName = event.event_name;

    let finalImageLink;

    if (imageFile.size > 0) {
        deleteImage(event.event_image_link);
        finalImageLink = await saveImage(imageFile, eventName);

    } else {
        finalImageLink = event.event_image_link;
    }


    //updating the event with the given data
    updateEvent(
        formData.get("category-id").trim(),
        validated["event-name"],
        validated["event-date"],
        validated["event-short-desc"],
        finalImageLink,
    
        validated["event-long-desc"],
        validated["section1-title"],
        validated["section1-desc"],
        validated["section2-title"],
        validated["section2-desc"],
        validated["section3-title"],
        validated["section3-desc"],
        validated["registration-deadline"],
            
        validated["event-start-time"],
        formData.get("event-end-time").trim(),
        validated["event-location"],

        eventId
    );

    //using contact info retrieved in the beginning

    //updating the contact info for contact 1
    updateContact(
        contact1.contact_id,
        firstLetterUpperCase(validated["contact1-name"]),
        validated["contact1-designation"],
        validated["contact1-email"],
        validated["contact1-phone"]
    )

    // handling optional contact 2 info
    const contact2Name = validated["contact2-name"];
    const contact2Designation = validated["contact2-designation"];
    const contact2Email = validated["contact2-email"];
    const contact2Phone = validated["contact2-phone"];

    // if contact2 for this event exists in the database
    if (contact2) {

        //checking if all contact2 inputs are empty, if so delete its data, else update it accordingly
        if (contact2Name == "" 
        && contact2Designation == ""
        && contact2Email == ""
        && contact2Phone == "") {
            deleteContact(contact2.contact_id);

        } else {
            updateContact(
                contact2.contact_id,
                firstLetterUpperCase(contact2Name),
                contact2Designation,
                contact2Email,
                contact2Phone
            )
        }

    // finally if contact2 for this event doesnt exist then add it to the database if the given input isn't empty 
    // if Contact 2 name is provided, treat it as intent to add Contact 2 and store all provided details
    // any missing optional fields are omitted in the view
    } else {
        if (contact2Name != "") {
            addContact(
                eventId,
                firstLetterUpperCase(contact2Name),
                contact2Designation,
                contact2Email,
                contact2Phone
            )
        }
    }


    const updatedEventName = validated["event-name"];

    return redirect(
        headers, 
        "/events/admin/events-homepage", 
        `✏️ Event "${updatedEventName}" updated successfully!`
    );
}