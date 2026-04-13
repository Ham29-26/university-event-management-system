import { fragments } from "./errors.js";

export function profileView({ user, errors = { "profile-picture": {} } }) {
    const { "profile-picture": profilePicture } = fragments(errors);

    return `
    <section class="profile">
       <h2>My Profile</h2>

       <p><strong>Username:</strong>  ${user.username}</p>
       <p><strong>Role:</strong>  ${user.role}</p>
       <p><strong>Full Name:</strong>  ${user.name}</p>
       <p><strong>Email:</strong>  ${user.email}</p>

       <p><strong>Current Profile Picture:</strong></p>
       <img src=${user.profile_image_url} alt="Profile Image" width="50" id="current-img">
       
       <form method="POST" enctype="multipart/form-data">
          <br><label for="profile-picture">Upload New Profile Picture: <strong>(optional)</strong> </label>
          
            <div class="input-group" id="image-upload">
                <br><input type="file" id="image-link" name="profile-picture" accept="image/*">
                ${profilePicture.message}
            </div>

            <button class="submit-btn" type="submit">Submit</button>
        </form>
    </section>
    `;
}