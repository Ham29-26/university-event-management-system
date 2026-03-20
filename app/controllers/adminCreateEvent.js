import { redirect } from "../tools/redirect.js"
import { getCategories } from "../models/categories.js";
import render from "../tools/render.js";
import { adminCreateEventView } from "../views/adminCreateEvent.js"
import { addEvent } from "../models/events.js";
import { addContact } from "../models/contacts.js";
import { firstLetterUpperCase } from "../../assets/script.js";
import { saveImage } from "../tools/imageHelpers.js";
import { validateSchema } from "../tools/validation.js";
import { eventSchema } from "../schema/eventSchema.js";

export function adminCreateEventController({ request }) {
    const categories = getCategories();

    return render(adminCreateEventView, { categories }, request, "events-details-page");
}


export async function addEventsController({ request }) {

    const categories = getCategories();

    const formData = await request.formData();

    // first validating all input and proceeding ahead only if they are valid
    // else will return a 400 status and present an error message
    const { isValid, errors, validated } = validateSchema(formData, eventSchema);

    if (!isValid) {
        return render(adminCreateEventView, { categories, errors }, request, "events-details-page", 400);
    }


    // retrieving image file first
    const imageFile = formData.get("event-image");

    const eventName = validated["event-name"];

    // saving image to the assets folder and retrieving image path
    const imagePath = await saveImage(imageFile, eventName);

    const eventId = addEvent(
        formData.get("category-id").trim(),
        validated["event-name"],
        validated["event-date"],
        validated["event-short-desc"],
        imagePath,

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
        validated["event-location"]
    );
    
    
    
    //adding contact 1 info
    addContact(
        eventId,
        validated["contact1-designation"],
        firstLetterUpperCase(validated["contact1-name"]),
        validated["contact1-email"],
        validated["contact1-phone"]
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