import { getUser, updateProfilePicture } from "../models/users.js";
import { deleteImage, saveProfileImage } from "../tools/imageHelpers.js";
import { redirect } from "../tools/redirect.js";
import render from "../tools/render.js";
import { profileView } from "../views/profile.js";

export function profileController(ctx) {
    const { session, errors } = ctx;
    const user = getUser(session.username);

    return render(profileView, { user, errors }, ctx, "admin-event-forms");
}

export async function addUpdateProfileImageController(ctx, next) {
    const { isValid, validated, headers, session } = ctx;

    if (!isValid) return next(ctx);

    const imageFile = validated["profile-picture"];
    const username = session.username;

    // get current user from DB
    const user = getUser(username);
    const currentImage = user.profile_image_url;

    let finalImageLink;
    
    if (imageFile.size > 0) {
        // delete old image ONLY if it's not default
        if (!currentImage.includes("/default/")){
            deleteImage(currentImage)
        }

        // save new image with unique name
        finalImageLink = await saveProfileImage(imageFile, `${username}-profile`);
    } else {
        finalImageLink = currentImage;
    }

    // update DB
    updateProfilePicture({
        username,
        profileImagePath: finalImageLink
    });

    return redirect(headers, "/events/profile", "Profile image updated successfully!");
}