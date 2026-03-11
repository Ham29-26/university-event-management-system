import { escape } from "@std/html/entities";
export function adminCreateEventView(data) {

  const selectCategory = data.categories.map(category => `
    <option value="${category.category_id}">${escape(category.category_name)}</option>
    `
  )

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

          <form method="POST">
          <div class="form-label-row">
                <label for="event-category">Event Category: </label>
                <div class="dropbox-wrapper">
                   <select id="event-category" name="category-id">
                   ${selectCategory}
                   </select>
                   <a href="/events/admin/add-new-category-form">+Add New Category</a>
                </div>
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-name">Event Name: </label>
              <input type="text" id="event-name" name="event-name">
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-date">Event Date: </label>
              <input type="date" id="event-date" name="event-date">
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-short-desc">Short Description on the Event: </label>
              <textarea name="event-short-desc" rows="10" cols="30" placeholder="Enter a short description of your event here...."></textarea>
            </div>

            <br>

            <div class="form-label-row">
              <label for="image-link">Event Image Link: </label>
              <input type="text" id="image-link" name="image-link"> 
            </div>

            <br><br>

            <h2>Events details page information</h2><br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="event-long-desc">Long Description on the Event: </label>
              <textarea name="event-long-desc" rows="25" cols="45" placeholder="Enter a long description of your event here...."></textarea>
            </div>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section1-title">Event sub-heading 1 Title: </label>
              <input type="text" id="section1-title" name="section1-title">
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section1-desc">Event sub-heading 1 Content: </label>
              <textarea name="section1-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 1 here...."></textarea>
            </div>

            <br>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section2-title">Event sub-heading 2 Title: </label>
              <input type="text" id="section2-title" name="section2-title">
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section2-desc">Event sub-heading 2 Content: </label>
              <textarea name="section2-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 2 here...."></textarea>
            </div>

            <br>

            <br>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="section3-title">Event sub-heading 3 Title: </label>
              <input type="text" id="section3-title" name="section3-title">
            </div>
            
            <br>

            <div class="form-label-row">
              <label for="section3-desc">Event sub-heading 3 Content: </label>
              <textarea name="section3-desc" rows="25" cols="45" placeholder="Enter the details of sub-heading 3 here...."></textarea>
            </div>

            <br>

            <div class="form-label-row">
              <label for="registration-deadline">Registration Deadline: </label>
              <input type="date" id="registration-deadline" name="registration-deadline">
            </div>

            <br><br>

            <h2>Event Information & Contact Details</h2><br>

            <div class="form-label-row">
              <label for="event-start-time"><strong>(Required)</strong> Start Time: </label>
              <input type="time" id="event-start-time" name="event-start-time"><br>
            </div>

            <div class="form-label-row">
              <label for="event-end-time"><strong>(Optional)</strong> Event End Time: </label>
              <input type="time" id="event-end-time" name="event-end-time">
            </div>

            <br>

            <div class="form-label-row">
              <label for="event-location">Event Location: </label>
              <input type="text" id="event-location" name="event-location">
            </div>

            <br>

            <h3>(Required)</h3>

            <div class="form-label-row">
              <label for="contact1-name">Event Contact 1 Name: </label>
              <input type="text" id="contact1-name" name="contact1-name"><br>
            </div>

            <div class="form-label-row">
              <label for="contact1-designation">Event Contact 1 Designation: </label>
              <input type="text" id="contact1-designation" name="contact1-designation"><br>
            </div>

            <div class="form-label-row">
              <label for="contact1-phone">Event Contact 1 Phone Number: </label>
              <input type="tel" id="contact1-phone" name="contact1-phone"><br>
            </div>
            
            <div class="form-label-row">
              <label for="contact1-email">Event Contact 1 Email ID: </label>
              <input type="email" id="contact1-email" name="contact1-email">
            </div>

            <h3>(Optional)</h3>

            <div class="form-label-row">
              <label for="contact2-name">Event Contact 2 Name: </label>
              <input type="text" id="contact2-name" name="contact2-name"><br>
            </div>

            <div class="form-label-row">
              <label for="contact2-designation">Event Contact 2 Designation: </label>
              <input type="text" id="contact2-designation" name="contact2-designation"><br>
            </div>

            <div class="form-label-row">
              <label for="contact2-phone">Event Contact 2 Phone Number: </label>
              <input type="tel" id="contact2-phone" name="contact2-phone"><br>
            </div>
            
            <div class="form-label-row">
              <label for="contact2-email">Event Contact 2 Email ID: </label>
              <input type="email" id="contact2-email" name="contact2-email">
            </div>

            <button class="submit-btn" type="submit">Submit All</button>

          </form>

        </article>

        <aside class="event-aside">
          <h3>Live preview if possible</h3>
        </aside>
      </section>
    </main>
    `
}