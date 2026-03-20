import { escape } from "@std/html/entities";
import { fragments } from "./errors.js";

export function adminUpdateEventView(data) {

  // collecting information on all fields and displaying user inputted fields in case of errors
  const form = data.formData || {};

  // collecting information on mandatory fields
  const eventName = form["event-name"] ?? data.events.event_name ?? "";
  const selectedCategoryId = form["category-id"] ?? data.selectedCategoryId;
  const eventDate = form["event-date"] ?? data.events.event_date ?? "";
  const shortDesc = form["event-short-desc"] ?? data.events.event_short_description ?? "";

  const longDesc = form["event-long-desc"] ?? data.events.event_long_description ?? "";

  const registrationDeadline = form["registration-deadline"] ?? data.events.registration_deadline ?? "";

  const startTime = form["event-start-time"] ?? data.events.event_start_time ?? "";
  const eventLocation = form["event-location"] ?? data.events.event_location ?? "";

  const contact1Name = form["contact1-name"] ?? data.contact1.contact_name ?? "";
  const contact1Designation = form["contact1-designation"] ?? data.contact1.contact_designation ?? "";
  const contact1Phone = form["contact1-phone"] ?? data.contact1.contact_phone ?? "";
  const contact1Email = form["contact1-email"] ?? data.contact1.contact_email ?? "";


  //collecting information on optional fields
  const section1Title = form["section1-title"] ?? data.events.event_section1_title ?? "";
  const section1Desc = form["section1-desc"] ?? data.events.event_section1_content ?? "";

  const section2Title = form["section2-title"] ?? data.events.event_section2_title ?? "";
  const section2Desc = form["section2-desc"] ?? data.events.event_section2_content ?? "";

  const section3Title = form["section3-title"] ?? data.events.event_section3_title ?? "";
  const section3Desc = form["section3-desc"] ?? data.events.event_section3_content ?? "";

  // safe fallback object in case contact2 doesn't exist
  const contact2 = data.contact2 || {};

  const contact2Name = form["contact2-name"] ?? contact2.contact_name ?? "";
  const contact2Designation = form["contact2-designation"] ?? contact2.contact_designation ?? "";
  const contact2Phone = form["contact2-phone"] ?? contact2.contact_phone ?? "";
  const contact2Email = form["contact2-email"] ?? contact2.contact_email ?? "";


  // extracting all error messages for the above mandatory fields
  const errors = data.errors || {};

  const f = fragments(errors);

  // collecting error messages for mandatory fields
  const eventCategoryError = f["category-id"] || {};
  const eventNameError = f["event-name"] || {};
  const eventDateError = f["event-date"] || {};
  const shortDescError = f["event-short-desc"] || {};

  const imageError = f["event-image"] || {};

  const longDescError = f["event-long-desc"] || {};
  const registrationDeadlineError = f["registration-deadline"] || {};
  const startTimeError = f["event-start-time"] || {};
  const eventLocationError = f["event-location"] || {};

  const contact1NameError = f["contact1-name"] || {};
  const contact1DesignationError = f["contact1-designation"] || {};
  const contact1EmailError = f["contact1-email"] || {};
  const contact1PhoneError = f["contact1-phone"] || {};


  //collecting error messages for optional fields
  const section1TitleError = f["section1-title"] || {};
  const section1DescError = f["section1-desc"] || {};

  const section2TitleError = f["section2-title"] || {};
  const section2DescError = f["section2-desc"] || {};

  const section3TitleError = f["section3-title"] || {};
  const section3DescError = f["section3-desc"] || {};

  const contact2NameError = f["contact2-name"] || {};
  const contact2DesignationError = f["contact2-designation"] || {};
  const contact2EmailError = f["contact2-email"] || {};
  const contact2PhoneError = f["contact2-phone"] || {};


  // populating dropbox
  const selectCategory = data.categories.map(category => `
    <option value="${category.category_id}"
      ${category.category_id == selectedCategoryId ? "selected" : ""}>
      ${escape(category.category_name)}
    </option>
    `).join("");

    console.log("selected category id", selectedCategoryId);
    

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
          <h1>Update Event</h1>
          <h2>Event Card Details</h2><br>

          <form method="POST" enctype="multipart/form-data">
          <div class="form-label-row">
                <label for="event-category">Event Category: </label>
                <div class="dropbox-wrapper">
                   <select id="event-category" name="category-id">
                   ${selectCategory}
                   </select>
                   ${eventCategoryError.message || ""}
                </div>
            </div>

          <br>

          <div class="form-label-row">
            <label for="event-name">Event Name: </label>

            <div class="input-group">
              <input type="text" id="event-name" name="event-name" value="${escape(eventName)}">
              ${eventNameError.message || ""}
            </div>
          </div>

            <br>

            <div class="form-label-row">
              <label for="event-date">Event Date: </label>

              <div class="input-group">
                <input type="date" id="event-date" name="event-date" value="${escape(eventDate)}">
                ${eventDateError.message || ""}
              </div>
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-short-desc">Short Description on the Event: </label>

              <div class="input-group">
                <textarea name="event-short-desc" rows="10" cols="30" placeholder="Enter a short description of your event here....">${escape(shortDesc)}</textarea>
                ${shortDescError.message || ""}
              </div>
            </div>

            <br><br>

            <h2>Events details page information</h2><br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="event-long-desc">Long Description on the Event: </label>

              <div class="input-group">
                <textarea name="event-long-desc" rows="25" cols="45" placeholder="Enter a long description of your event here....">${escape(longDesc)}</textarea>
                ${longDescError.message || ""}
              </div>
            </div>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section1-title">Event sub-heading 1 Title: </label>

              <div class="input-group">
                <input type="text" id="section1-title" name="section1-title" value="${escape(section1Title)}">
                ${section1TitleError.message || ""}
              </div>
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section1-desc">Event sub-heading 1 Content: </label>

              <div class="input-group">
                <textarea name="section1-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 1 here....">${escape(section1Desc)}</textarea>
                ${section1DescError.message || ""}
              </div>
            </div>

            <br>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section2-title">Event sub-heading 2 Title: </label>

              <div class="input-group">
                <input type="text" id="section2-title" name="section2-title" value="${escape(section2Title)}">
                ${section2TitleError.message || ""}
              </div>
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section2-desc">Event sub-heading 2 Content: </label>

              <div class="input-group">
                <textarea name="section2-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 2 here....">${escape(section2Desc)}</textarea>
                ${section2DescError.message || ""}
              </div>
            </div>

            <br>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section3-title">Event sub-heading 3 Title: </label>

              <div class="input-group">
                <input type="text" id="section3-title" name="section3-title" value="${escape(section3Title)}">
                ${section3TitleError.message || ""}
              </div>
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section3-desc">Event sub-heading 3 Content: </label>

              <div class="input-group">
                <textarea name="section3-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 3 here....">${escape(section3Desc)}</textarea>
                ${section3DescError.message || ""}
              </div>
            </div>

            <br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="registration-deadline">Registration Deadline: </label>

              <div class="input-group">
                <input type="date" id="registration-deadline" name="registration-deadline" value="${escape(registrationDeadline)}">
                ${registrationDeadlineError.message || ""}
              </div>
            </div>

            <br><br>

            <h2>Event Information & Contact Details</h2><br>

            <div class="form-label-row">
              <label for="event-start-time"><strong>(Required)</strong> Start Time: </label>

              <div class="input-group">
                <input type="time" id="event-start-time" name="event-start-time" value="${escape(startTime)}"><br>
                ${startTimeError.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="event-end-time"><strong>(Optional)</strong> Event End Time: </label>
              <input type="time" id="event-end-time" name="event-end-time" 
              value="${escape(data.events.event_end_time || "")}">
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-location">Event Location: </label>

              <div class="input-group">
                <input type="text" id="event-location" name="event-location" value="${escape(eventLocation)}">
                ${eventLocationError.message || ""}
              </div>
            </div>

            <br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="contact1-name">Event Contact 1 Name: </label>

              <div class="input-group">
                <input type="text" id="contact1-name" name="contact1-name" value="${escape(contact1Name)}"><br>
                ${contact1NameError.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="contact1-designation">Event Contact 1 Designation: </label>

              <div class="input-group">
                <input type="text" id="contact1-designation" name="contact1-designation" value="${escape(contact1Designation)}"><br>
                ${contact1DesignationError.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="contact1-phone">Event Contact 1 Phone Number: </label>

              <div class="input-group">
                <input type="tel" id="contact1-phone" name="contact1-phone" 
                placeholder="Phone number should be in the format +971561234567" value="${escape(contact1Phone)}"><br>
                ${contact1PhoneError.message || ""}
              </div>
            </div>
            
            <div class="form-label-row">
              <label for="contact1-email">Event Contact 1 Email ID: </label>

              <div class="input-group">
                <input type="email" id="contact1-email" name="contact1-email" value="${escape(contact1Email)}">
                ${contact1EmailError.message || ""}
              </div>
            </div>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="contact2-name">Event Contact 2 Name: </label>

              <div class="input-group">
                <input type="text" id="contact2-name" name="contact2-name" value="${escape(contact2Name)}"><br>
                ${contact2NameError.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="contact2-designation">Event Contact 2 Designation: </label>

              <div class="input-group">
                <input type="text" id="contact2-designation" name="contact2-designation" value="${escape(contact2Designation)}"><br>
                ${contact2DesignationError.message || ""}
              </div>
            </div>

            <div class="form-label-row">
              <label for="contact2-phone">Event Contact 2 Phone Number: </label>

              <div class="input-group">
                <input type="tel" id="contact2-phone" name="contact2-phone" 
                placeholder="Phone number should be in the format +971561234567" value="${escape(contact2Phone)}"><br>
                ${contact2PhoneError.message || ""}
              </div>
            </div>
            
            <div class="form-label-row">
              <label for="contact2-email">Event Contact 2 Email ID: </label>

              <div class="input-group">
                <input type="email" id="contact2-email" name="contact2-email" value="${escape(contact2Email)}">
                ${contact2EmailError.message || ""}
              </div>
            </div>

            <br>

            <h2>Event Image</h2>

            <br>

            <p class="form-hint">
                Upload a new image only if you want to replace the existing one.
            </p>
            
            <br>

            <div class="form-label-row">
              <p>Current Image:</p>
              <img src=${data.events.event_image_link} alt="${escape(eventName)}" width="200" id="event-image">

              <label for="image">Upload New Image: <strong>(optional)</strong> </label>

              <div class="input-group" id="image-upload">
                <input type="file" id="image-link" name="event-image" accept="image/*">
                ${imageError.message || ""}
              </div>
            </div>

            <button class="submit-btn" type="submit">Submit All</button>

          </form>

        </article>
      </section>
    </main>
    `
}