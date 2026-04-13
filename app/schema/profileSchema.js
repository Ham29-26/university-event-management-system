import { isImageFile } from "../tools/validation.js";

export const profileSchema = {
    "profile-picture": {
            validators: [isImageFile],
            displayName: "Profile Picture"
    }
}