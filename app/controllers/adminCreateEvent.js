import { redirect } from "../tools/redirect.js"
import { getCategories } from "../models/categories.js";
import render from "../tools/render.js";
import { adminCreateEventView } from "../views/adminCreateEvent.js"
import { addEvent } from "../models/events.js";
import { addContact } from "../models/contacts.js";
import { firstLetterUpperCase } from "../../assets/script.js";
import { saveImage } from "../tools/imageHelpers.js";

export function adminCreateEventController(ctx) {
    const { errors } = ctx;

    const categories = getCategories();

    return render(adminCreateEventView, { categories, errors }, ctx, "admin-event-forms");
}


export async function addEventsController(ctx, next) {
    const { headers, isValid, validated, formData } = ctx;

    // validating user provided input
    if (!isValid) return next(ctx);

    // retrieving image file first
    const imageFile = formData.get("event-image");

    const eventName = validated["event-name"];

    // saving image to the assets folder and retrieving image path
    const imagePath = await saveImage(imageFile, eventName);

    // adding the new event to the database
    const eventId = addEvent(
        formData.get("category-id").trim(),
        validated["event-name"],
        validated["event-date"],
        validated["event-short-desc"],
        imagePath,

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
        validated["event-location"]
    );
    
    
    
    // adding contact 1 info
    addContact(
        eventId,
        firstLetterUpperCase(validated["contact1-name"]),
        validated["contact1-designation"],
        validated["contact1-email"],
        validated["contact1-phone"]
    )

    // if Contact 2 name is provided, treat it as intent to add Contact 2 and store all provided details
    // any missing optional fields are omitted in the view
    if (validated["contact2-name"] != "") {
        addContact(
            eventId,
            firstLetterUpperCase(validated["contact2-name"]),
            validated["contact2-designation"],
            validated["contact2-email"],
            validated["contact2-phone"]
        )
    }


    return redirect(
        headers, 
        "/events/admin/events-homepage", 
        `✅ Event "${eventName}" created successfully!`
    );
}