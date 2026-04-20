import { formatDate } from "../../assets/script.js";

export function studentRegistrationsView(data) {
    const registrations = data.registrations;

    const registrationHtml = 
    registrations.map(registration => `
    <div class="registration-card">
    
        <div class="registration-header">
            <h3>${registration.event_name}</h3>
            <span class="event-date">📅 ${formatDate(registration.event_date)}</span>
        </div>

        <div class="registration-body">
            <p>📍 ${registration.event_location}</p>
            <p>📱 ${registration.phone}</p>
            <p>🎓 Year ${registration.year}</p>
        </div>

        <div class="registration-actions">
            <button type="button" class="cancel-btn"
            onclick="location.href='/events/delete-registration/${registration.event_id}'">
                Cancel Registration
            </button>
        </div>

  </div>
    `
    ).join("");
    
    return`
      <header>
        <h1>My Registered Events</h1>
      </header>

      <main class="registration-styles">
        ${registrationHtml || "<p>No registrations yet.</p>"}
      </main>
    `;
}

export function adminRegistrationsView({ groupedRegistrations = {}, events = [], selectedEventId }) {
    
   const dropdown = events.map(event => `
  <option value="${event.event_id}"
    ${event.event_id == selectedEventId ? "selected" : ""}>
    ${event.event_name} (${formatDate(event.event_date)})
  </option>
`).join("");

const html = Object.entries(groupedRegistrations).map(([eventName, regs]) => `
  
  <div class="registration-card">

    <div class="registration-header">
      <h3>${eventName}</h3>
      <span class="event-date">
        📅 ${formatDate(regs[0].event_date)} • ${regs.length} students
      </span>
    </div>

    <div class="registration-body">

      ${regs.map((r, i) => `
        <div class="student-row">
          <p><strong>${i + 1}. ${r.student_name}</strong></p>
          <p>📱 ${r.phone}</p>
          <p>🎓 Year ${r.year}</p>
        </div>
      `).join("")}

    </div>

  </div>

`).join("");

    return `
    <header>
        <h1>Manage Registrations</h1>
    </header>

    <form method="GET" action="/events/admin/registrations" class="registration-filter">
        <select name="event-id">
            <option value="">All Events</option>
            ${dropdown}
        </select>
        <button>Filter</button>
    </form>

    <main class="registration-styles">
        ${html || "<p class='empty'>No registrations yet.</p>"}
    </main>
    `;
}