import { getCategories } from "../models/categories.js";
import { getContactsByEventId, updateContact, addContact, deleteContact } from "../models/contacts.js";
import { getEventByEventId, updateEvent } from "../models/events.js";
import render from "../tools/render.js";
import { adminUpdateEventView } from "../views/adminUpdateEvent.js";
import { redirect } from "../tools/redirect.js";
import { firstLetterUpperCase } from "../../assets/script.js";
import { deleteImage, saveImage } from "../tools/imageHelpers.js";
import { validateSchema } from "../tools/validation.js";
import { updateEventSchema } from "../schema/updateEventSchema.js";


export function adminUpdateEventController({ request }) {
     
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

    return render(adminUpdateEventView, { events, categories, selectedCategoryId, contact1, contact2}, request, "events-details-page");
}


export async function addUpdateEventController({ request }) {

    const url = new URL(request.url);
    const pathname = url.pathname;
    
    const eventId = pathname.split("/")[5];
    const selectedCategoryId = pathname.split("/")[4];

    // RE=FETCH EVERYTHING (same as GET controller)
    const events = getEventByEventId(eventId);
    const categories = getCategories();
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
    const formData = await request.formData();

    // first validating all input and proceeding ahead only if they are valid
    // else will return a 400 status and present an error message
    const { isValid, errors, validated } = validateSchema(formData, updateEventSchema);
    
    if (!isValid) {
        return render(adminUpdateEventView, { 
            events,
            categories,
            selectedCategoryId,
            contact1,
            contact2, 
            formData: Object.fromEntries(formData),
            errors 
        }, request, "events-details-page", 400);
    }

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
        formData.get("section1-title").trim(),
        formData.get("section1-desc").trim(),
        formData.get("section2-title").trim(),
        formData.get("section2-desc").trim(),
        formData.get("section3-title").trim(),
        formData.get("section3-desc").trim(),
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
        validated["contact1-designation"],
        firstLetterUpperCase(validated["contact1-name"]),
        validated["contact1-email"],
        validated["contact1-phone"]
    )

    const contact2Designation = formData.get("contact2-designation").trim();
    const contact2Name = formData.get("contact2-name").trim();
    const contact2Email = formData.get("contact2-email").trim();
    const contact2Phone = formData.get("contact2-phone").trim();

    // if contact2 for this event exists in the database
    if (contact2) {

        //checking if all contact2 inputs are empty, if so delete its data
        if (contact2Designation == "" 
        && contact2Name == "" 
        && contact2Email == ""
        && contact2Phone == "") {
            deleteContact(contact2.contact_id);

        //if all inputs are not empty then update it accordingly
        } else {
            updateContact(
                contact2.contact_id,
                contact2Designation,
                firstLetterUpperCase(contact2Name),
                contact2Email,
                contact2Phone
            )
        }

    // finally if contact2 for this event doesnt exist then add it to the database if the given input isn't empty 
    // (only validating name as it should be sufficient)
    } else {
        if (contact2Name != "") {
            addContact(
                eventId,
                contact2Designation,
                firstLetterUpperCase(contact2Name),
                contact2Email,
                contact2Phone
            )
        }
    }


    const updatedEventName = validated["event-name"];

    const headers = new Headers();

    return redirect(
        headers, 
        "/events/admin/events-homepage", 
        `✏️ Event "${updatedEventName}" updated successfully!`
    );
}