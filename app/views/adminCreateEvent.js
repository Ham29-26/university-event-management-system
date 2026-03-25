import { escape } from "@std/html/entities";
import { fragments } from "./errors.js";

export function adminCreateEventView({ categories, errors = {} }) {

  // extracting all error messages
  const f = fragments(errors);

  // extracting errors for mandatory fields
  const eventCategory = f["category-id"] || {};
  const eventName = f["event-name"] || {};
  const eventDate = f["event-date"] || {};
  const eventShortDesc = f["event-short-desc"] || {};
  const eventImage = f["event-image"] || {};

  const eventLongDesc = f["event-long-desc"] || {};
  const registrationDeadline = f["registration-deadline"] || {};
  const startTime = f["event-start-time"] || {};
  const eventLocation = f["event-location"] || {};

  const contact1Name = f["contact1-name"] || {};
  const contact1Designation = f["contact1-designation"] || {};
  const contact1Email = f["contact1-email"] || {};
  const contact1Phone = f["contact1-phone"] || {};

  // extracting errors for optional fields (they are not required but will present errors in case of bad data)
  const section1Title = f["section1-title"] || {};
  const section1Desc = f["section1-desc"] || {};

  const section2Title = f["section2-title"] || {};
  const section2Desc = f["section2-desc"] || {};

  const section3Title = f["section3-title"] || {};
  const section3Desc = f["section3-desc"] || {};

  const contact2Name = f["contact2-name"] || {};
  const contact2Designation = f["contact2-designation"] || {};
  const contact2Email = f["contact2-email"] || {};
  const contact2Phone = f["contact2-phone"] || {};


  // extracting all the existing categories to be displayed in the dropdown
  const selectCategory = categories.map(category => `
    <option value="${category.category_id}"
    ${category.category_id == eventCategory.text ? "selected" : ""}>
    ${escape(category.category_name)}
    </option>
    `).join("");


    return `
    <header>
      <nav>
        <ul>
          <li><a href="/events/admin/events-homepage">Dashboard</a></li>
          <li><a href="/events/admin/event-creation-form">Create Event</a></li>
          <li><a href="#">Log out</a></li>
          <li><a href="/">Student Page</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section class="event-content-wrapper">
        <article class="event-description">
          <h1>Create Event</h1>
          <h2>Event Card Details</h2><br>

          <form method="POST" enctype="multipart/form-data">
          <div class="form-label-row">
                <label for="event-category">Event Category: </label>
                <div class="dropbox-wrapper">
                   <select id="event-category" name="category-id">
                   <option value="" disabled ${!eventCategory.value? "selected" : ""}>Select a category</option>
                   ${selectCategory}
                   </select>
                   ${eventCategory.message || ""}
                   <br>
                   <a href="/events/admin/add-new-category-form">+Add New Category</a>
                </div>
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-name">Event Name: </label>

              <div class="input-group">
                <input type="text" id="event-name" name="event-name"${eventName.value}>
                ${eventName.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="event-date">Event Date: </label>

              <div class="input-group">
                <input type="date" id="event-date" name="event-date"${eventDate.value}>
                ${eventDate.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="event-short-desc">Short Description on the Event: </label>

              <div class="input-group">
                <textarea name="event-short-desc" rows="10" cols="30" placeholder="Enter a short description of your event here....">${eventShortDesc.text || ""}</textarea>
              ${eventShortDesc.message || ""}
              </div>
            </div>

            <br><br>

            <h2>Events details page information</h2><br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="event-long-desc">Long Description on the Event: </label>

              <div class="input-group">
                <textarea name="event-long-desc" rows="25" cols="45" placeholder="Enter a long description of your event here....">${eventLongDesc.text || ""}</textarea>
                ${eventLongDesc.message || ""}
              </div>
            </div>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section1-title">Event sub-heading 1 Title: </label>

              <div class="input-group">
                <input type="text" id="section1-title" name="section1-title"${section1Title.value || ""}>
                ${section1Title.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="section1-desc">Event sub-heading 1 Content: </label>

              <div class="input-group">
                <textarea name="section1-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 1 here....">${section1Desc.text || ""}</textarea>
                ${section1Desc.message || ""}
              </div>
            </div>

            <br>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section2-title">Event sub-heading 2 Title: </label>

              <div class="input-group">
              <input type="text" id="section2-title" name="section2-title"${section2Title.value || ""}>
              ${section2Title.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="section2-desc">Event sub-heading 2 Content: </label>

              <div class="input-group">
                <textarea name="section2-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 2 here....">${section2Desc.text || ""}</textarea>
                ${section2Desc.message || ""}
              </div>
            </div>

            <br>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section3-title">Event sub-heading 3 Title: </label>

              <div class="input-group">
              <input type="text" id="section3-title" name="section3-title"${section3Title.value || ""}>
              ${section3Title.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="section3-desc">Event sub-heading 3 Content: </label>
              
              <div class="input-group">
                <textarea name="section3-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 3 here....">${section3Desc.text || ""}</textarea>
                ${section3Desc.message || ""}
              </div>
            </div>

            <br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="registration-deadline">Registration Deadline: </label>

              <div class="input-group">
                <input type="date" id="registration-deadline" name="registration-deadline"${registrationDeadline.value || ""}>
                ${registrationDeadline.message || ""}
              </div>
            </div>

            <br><br>

            <h2>Event Information & Contact Details</h2><br>

            <div class="form-label-row">
              <label for="event-start-time"><strong>(Required)</strong> Start Time: </label>

              <div class="input-group">
                <input type="time" id="event-start-time" name="event-start-time"${startTime.value || ""}><br>
                ${startTime.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="event-end-time"><strong>(Optional)</strong> Event End Time: </label>
              <input type="time" id="event-end-time" name="event-end-time">
            </div>

            <div class="form-label-row">
              <label for="event-location">Event Location: </label>

              <div class="input-group">
                <input type="text" id="event-location" name="event-location"${eventLocation.value || ""}>
                ${eventLocation.message || ""}
              </div>
            </div>

            <br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="contact1-name">Event Contact 1 Name: </label>

              <div class="input-group">
                <input type="text" id="contact1-name" name="contact1-name"${contact1Name.value || ""}><br>
                ${contact1Name.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="contact1-designation">Event Contact 1 Designation: </label>

              <div class="input-group">
                <input type="text" id="contact1-designation" name="contact1-designation"${contact1Designation.value || ""}><br>
                ${contact1Designation.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="contact1-phone">Event Contact 1 Phone Number: </label>

              <div class="input-group">
                <input type="tel" id="contact1-phone" name="contact1-phone" 
                placeholder="Phone number should be in the format +971561234567"${contact1Phone.value || ""}><br>
                ${contact1Phone.message || ""}
              </div>
            </div>
            
            <div class="form-label-row">
              <label for="contact1-email">Event Contact 1 Email ID: </label>

              <div class="input-group">
                <input type="email" id="contact1-email" name="contact1-email"${contact1Email.value || ""}>
                ${contact1Email.message || ""}
              </div>
            </div>

            <br>

            <h3>(Optional)</h3>
            <small><strong>Fill all Contact 2 fields or leave all empty.</strong></small>

            <br><br>

            <div class="form-label-row">
              <label for="contact2-name">Event Contact 2 Name: </label>

              <div class="input-group">
                <input type="text" id="contact2-name" name="contact2-name"${contact2Name.value || ""}>
                ${contact2Name.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="contact2-designation">Event Contact 2 Designation: </label>

              <div class="input-group">
                <input type="text" id="contact2-designation" name="contact2-designation"${contact2Designation.value || ""}>
                ${contact2Designation.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="contact2-phone">Event Contact 2 Phone Number: </label>

              <div class="input-group">
                <input type="tel" id="contact2-phone" name="contact2-phone" 
                placeholder="Phone number should be in the format +971561234567"${contact2Phone.value || ""}>
                ${contact2Phone.message || ""}
              </div>
            </div>
            
            <div class="form-label-row">
              <label for="contact2-email">Event Contact 2 Email ID: </label>

              <div class="input-group">
                <input type="email" id="contact2-email" name="contact2-email"${contact2Email.value || ""}>
                ${contact2Email.message || ""}
              </div>
            </div>

            <br>

            <h2>Event Image</h2>

            <br>

            <p class="form-hint">
              Please upload an image for the event in any suitable image format (JPG, PNG, etc.).
            </p>

            <p class="form-hint">
              If you have already selected an image but made other changes, please re-upload it to keep it.
            </p>

            <br>

            <div class="form-label-row">
              <label for="image">Upload Event Image: </label>

              <div class="input-group">
                <input type="file" id="image-link" name="event-image" accept="image/*">
                ${eventImage.message || ""}
              </div> 
            </div>

            <button class="submit-btn" type="submit">Submit All</button>

          </form>

        </article>
      </section>
    </main>
    `
}