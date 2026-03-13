import { redirect } from "../tools/redirect.js"
import { getCategories } from "../models/categories.js";
import render from "../tools/render.js";
import { adminCreateEventView } from "../views/adminCreateEvent.js"
import { addEvent } from "../models/events.js";
import { addContact } from "../models/contacts.js";
import { firstLetterUpperCase } from "../../assets/script.js";
import { saveImage } from "../tools/imageHelpers.js";

export function adminCreateEventController({ request }) {
    const categories = getCategories();

    return render(adminCreateEventView, { categories }, request, "events-details-page");
}


export async function addEventsController({ request }) {
    const formData = await request.formData();

    // retrieving image file first
    const imageFile = formData.get("image");

    const eventName = formData.get("event-name").trim()

    // saving image to the assets folder and retrieving image path
    const imagePath = await saveImage(imageFile, eventName);

    const eventId = addEvent(
        formData.get("category-id").trim(),
        formData.get("event-name").trim(),
        formData.get("event-date").trim(),
        formData.get("event-short-desc").trim(),
        imagePath,

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
        formData.get("event-location").trim()
    );
    
    
    
    //adding contact 1 info
    addContact(
        eventId,
        formData.get("contact1-designation").trim(),
        firstLetterUpperCase(formData.get("contact1-name")).trim(),
        formData.get("contact1-email").trim(),
        formData.get("contact1-phone").trim()
    )

    //adding contact 2 info only if it is not null / not empty
    if (formData.get("contact2-name") != "") {
        addContact(
            eventId,
            formData.get("contact2-designation").trim(),
            firstLetterUpperCase(formData.get("contact2-name")).trim(),
            formData.get("contact2-email").trim(),
            formData.get("contact2-phone").trim()
        )
    }

    const headers = new Headers();

    return redirect(
        headers, 
        "/events/admin/events-homepage", 
        `✅ Event "${eventName}" created successfully!`
    );
}