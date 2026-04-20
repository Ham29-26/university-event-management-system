import { formatDate } from "../../assets/script.js";
import { fragments } from "./errors.js";

export function registrationView({ user, allEvents, selectedEventId, errors = {} }) {
    const f = fragments(errors);

    const selectedEventError = f["event-id"] || {};
    const studentId = f["student-id"] || {};
    const phone = f["phone"] || {};
    const year = f["year"] || {};

    const placeholderOption = `
    <option value="" disabled ${!selectedEventId ? "selected" : ""}>
      Select an Event
    </option>
    `

    const eventsDropbox = allEvents.map(event =>
      `
      <option value="${event.event_id}"
        ${event.event_id == selectedEventId ? "selected" : ""}>
        ${event.event_name} (${formatDate(event.event_date)})
      </option>
      `).join("");

    return `
    <main>
      <section aria-labelledby="registration-heading" class="center">
        <h2 id="registration-heading">Register for Event</h2>

        <form method="POST" class="auth">

          <!-- EVENT -->
          <div class="form-label-row">
              <label for="all-events">Event: </label>
              <div class="dropbox-wrapper">
                  <select id="all-events" name="event-id">
                  ${placeholderOption}
                  ${eventsDropbox}
                  </select>
                  ${selectedEventError.message || ""}
              </div>
          </div>

          <!-- NAME -->
          <div class="form-label-row">
            <label>Name:</label>
            <div class="input-group">
              <input value="${user.name}" readonly></input>
            </div>
          </div>

          <!-- EMAIL -->
          <div class="form-label-row">
            <label>Email:</label>
            <div class="input-group">
              <input value="${user.email}" readonly></input>
            </div>
          </div>

          <!-- STUDENT ID -->
          <div class="form-label-row">
            <label for="student-id">Student ID:</label>
            <div class="input-group">
              <input id="student-id" name="student-id"
              placeholder="A1234567"
              ${studentId.value || ""}>
              ${studentId.message || ""}
            </div>
          </div>

          <!-- PHONE -->
          <div class="form-label-row">
            <label for="phone">Phone Number:</label>
            <div class="input-group">
              <input id="phone" name="phone" 
              placeholder="+971561234567"
              ${phone.value || ""}>
              ${phone.message || ""}
            </div>
          </div>

          <!-- YEAR -->
          <div class="form-label-row">
            <label for="year">Year of Study:</label>
            <div class="input-group">
              <select id="year" name="year">
                <option value="" disabled selected>Select year</option>
                <option value="1" ${year.value === "1" ? "selected" : ""}>1st Year</option>
                <option value="2" ${year.value === "2" ? "selected" : ""}>2nd Year</option>
                <option value="3" ${year.value === "3" ? "selected" : ""}>3rd Year</option>
                <option value="4" ${year.value === "4" ? "selected" : ""}>4th Year</option>
              </select>
              ${year.message || ""}
            </div>
          </div>

          <button>Register</button>

        </form>
      </section>
    </main>
    `
}