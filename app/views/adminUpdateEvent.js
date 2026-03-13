import { escape } from "@std/html/entities";

export function adminUpdateEventView(data) {
    
    const selectCategory = data.categories.map(category => `
    <option value="${category.category_id}"
      ${escape(category.category_name).toLowerCase() == escape(data.eventCategory.category_name).toLowerCase() ? "selected" : ""}>
      ${escape(category.category_name)}
    </option>
    `).join("");


  const section1_title = data.events.event_section1_title || "";
  const section1_content = data.events.event_section1_content || "";

  const section2_title = data.events.event_section2_title || "";
  const section2_content = data.events.event_section2_content || "";

  const section3_title = data.events.event_section3_title || "";
  const section3_content = data.events.event_section3_content || "";

  const event_end_time = data.events.event_end_time || "";

  const contact2 = data.contact2 || {};
  
  const contact2_name = contact2.contact_name || "";
  const contact2_designation = contact2.contact_designation || "";
  const contact2_phone = contact2.contact_phone || "";
  const contact2_email = contact2.contact_email || "";


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
            <label for="event-name">Event Name: </label>
            <input type="text" id="event-name" name="event-name" value="${escape(data.events.event_name)}">
            </div>

            <br>

            <div class="form-label-row">
                <label for="event-category">Event Category: </label>
                <div class="dropbox-wrapper">
                   <select id="event-category" name="category-id">
                   ${selectCategory}
                   </select>
                </div>
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-date">Event Date: </label>
              <input type="date" id="event-date" name="event-date" value="${escape(data.events.event_date)}">
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-short-desc">Short Description on the Event: </label>
              <textarea name="event-short-desc" rows="10" cols="30" placeholder="Enter a short description of your event here....">${escape(data.events.event_short_description)}</textarea>
            </div>

            <br><br>

            <div class="form-label-row">
              <p>Current Image:</p>
              <img src=${data.events.event_image_link} alt="${data.events.event_name}" width="200" height="100">
              <label for="image">Upload New Image: <strong>(optional)</strong> </label>
              <input type="file" id="image-link" name="image" accept="image/*""> 
            </div>

            <br><br>

            <h2>Events details page information</h2><br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="event-long-desc">Long Description on the Event: </label>
              <textarea name="event-long-desc" rows="25" cols="45" placeholder="Enter a long description of your event here....">${escape(data.events.event_long_description)}</textarea>
            </div>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section1-title">Event sub-heading 1 Title: </label>
              <input type="text" id="section1-title" name="section1-title" value="${escape(section1_title)}">
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section1-desc">Event sub-heading 1 Content: </label>
              <textarea name="section1-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 1 here....">${escape(section1_content)}</textarea>
            </div>

            <br>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section2-title">Event sub-heading 2 Title: </label>
              <input type="text" id="section2-title" name="section2-title" value="${escape(section2_title)}">
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section2-desc">Event sub-heading 2 Content: </label>
              <textarea name="section2-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 2 here....">${escape(section2_content)}</textarea>
            </div>

            <br>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section3-title">Event sub-heading 3 Title: </label>
              <input type="text" id="section3-title" name="section3-title" value="${escape(section3_title)}">
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section3-desc">Event sub-heading 3 Content: </label>
              <textarea name="section3-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 3 here....">${escape(section3_content)}</textarea>
            </div>

            <br>

            <div class="form-label-row">
              <label for="registration-deadline">Registration Deadline: </label>
              <input type="date" id="registration-deadline" name="registration-deadline" value="${escape(data.events.registration_deadline)}">
            </div>

            <br><br>

            <h2>Event Information & Contact Details</h2><br>

            <div class="form-label-row">
              <label for="event-start-time"><strong>(Required)</strong> Start Time: </label>
              <input type="time" id="event-start-time" name="event-start-time" value="${escape(data.events.event_start_time)}"><br>
            </div>

            <div class="form-label-row">
              <label for="event-end-time"><strong>(Optional)</strong> Event End Time: </label>
              <input type="time" id="event-end-time" name="event-end-time" value="${escape(event_end_time)}">
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-location">Event Location: </label>
              <input type="text" id="event-location" name="event-location" value="${escape(data.events.event_location)}">
            </div>

            <br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="contact1-name">Event Contact 1 Name: </label>
              <input type="text" id="contact1-name" name="contact1-name" value="${escape(data.contact1.contact_name)}"><br>
            </div>

            <div class="form-label-row">
              <label for="contact1-designation">Event Contact 1 Designation: </label>
              <input type="text" id="contact1-designation" name="contact1-designation" value="${escape(data.contact1.contact_designation)}"><br>
            </div>

            <div class="form-label-row">
              <label for="contact1-phone">Event Contact 1 Phone Number: </label>
              <input type="tel" id="contact1-phone" name="contact1-phone" value="${escape(data.contact1.contact_phone)}"><br>
            </div>
            
            <div class="form-label-row">
              <label for="contact1-email">Event Contact 1 Email ID: </label>
              <input type="email" id="contact1-email" name="contact1-email" value="${escape(data.contact1.contact_email)}">
            </div>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="contact2-name">Event Contact 2 Name: </label>
              <input type="text" id="contact2-name" name="contact2-name" value="${escape(contact2_name)}"><br>
            </div>

            <div class="form-label-row">
              <label for="contact2-designation">Event Contact 2 Designation: </label>
              <input type="text" id="contact2-designation" name="contact2-designation" value="${escape(contact2_designation)}"><br>
            </div>

            <div class="form-label-row">
              <label for="contact2-phone">Event Contact 2 Phone Number: </label>
              <input type="tel" id="contact2-phone" name="contact2-phone" value="${escape(contact2_phone)}"><br>
            </div>
            
            <div class="form-label-row">
              <label for="contact2-email">Event Contact 2 Email ID: </label>
              <input type="email" id="contact2-email" name="contact2-email" value="${escape(contact2_email)}">
            </div>

            <button class="submit-btn" type="submit">Submit All</button>

          </form>

        </article>
      </section>
    </main>
    `
}