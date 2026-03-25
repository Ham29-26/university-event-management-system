import { isImageIfProvided } from "../tools/validation.js";
import { eventSchema } from "./eventSchema.js";

export const updateEventSchema = {
    ...eventSchema, //copy all event schema info 

    // override image to only give isImage error and no required error as uploading an image is optional in the update form
    "event-image": {
            validators: [isImageIfProvided],
            displayName: "Event image"
    }
}