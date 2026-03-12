import { getCategories, getCategoriesById } from "../models/categories.js";
import { getContactsByEventId, updateContact, addContact, deleteContact } from "../models/contacts.js";
import { getEventByEventId, updateEvent } from "../models/events.js";
import render from "../tools/render.js";
import { adminUpdateEventView } from "../views/adminUpdateEvent.js";
import { redirect } from "../tools/redirect.js";
import { firstLetterUpperCase } from "../../assets/script.js";
import { deleteImage, saveImage } from "../tools/imageHelpers.js";


export function adminUpdateEventController({ request }) {
     
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    const eventId = pathname.split("/")[5];
    const categoryId = pathname.split("/")[4];
    
    const events = getEventByEventId(eventId);
    const categories = getCategories();
    const eventCategory = getCategoriesById(categoryId);
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

    return render(adminUpdateEventView, { events, categories, eventCategory, contact1, contact2}, request, "events-details-page");
}


export async function addUpdateEventController({ request }) {
    const url = new URL(request.url);

    const pathname = url.pathname;

    const eventId = pathname.split("/")[5];

    const formData = await request.formData();

    // adding new image file if given and removing the old image
    // or else keeping the old image
    const imageFile = formData.get("image");

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
            formData.get("event-name").trim(),
            formData.get("event-date").trim(),
            formData.get("event-short-desc").trim(),
            finalImageLink,
    
            formData.get("event-long-desc").trim(),
            formData.get("section1-title").trim(),
            formData.get("section1-desc").trim(),
            formData.get("section2-title").trim(),
            formData.get("section2-desc").trim(),
            formData.get("section3-title").trim(),
            formData.get("section3-desc").trim(),
            formData.get("registration-deadline").trim(),
            
            formData.get("event-start-time").trim(),
            formData.get("event-end-time").trim(),
            formData.get("event-location").trim(),

            eventId
        );

    //retreiving contact info
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

    //updating the contact info for contact 1
    updateContact(
        contact1.contact_id,
        formData.get("contact1-designation").trim(),
        firstLetterUpperCase(formData.get("contact1-name")).trim(),
        formData.get("contact1-email").trim(),
        formData.get("contact1-phone").trim()
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


    return redirect("/events/admin/events-homepage")
}