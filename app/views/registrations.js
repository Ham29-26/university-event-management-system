export function studentRegistrationsView(data) {
    const registrations = data.registrations;

    const registrationHtml = 
    registrations.map(registration => `
        <p><strong>Event:</strong> ${registration.event_name}</p>
        <p><strong>📅 Date:</strong> ${registration.event_date}</p>
        <p><strong>📍 Location:</strong> ${registration.event_location}</p>

        <p><strong>📱 Phone Number:</strong> ${registration.phone}</p>
        <p><strong>🎓 Year:</strong> ${registration.year}</p>

        <button>Cancel Registration</button>
    `
    ).join("");
    
    return`
      <header>
        <h1>My Registered Events</h1>
      </header>

      <main>
        ${registrationHtml || "<p>No registrations yet.</p>"}
      </main>
    `;
}

export function adminRegistrationsView(data) {
    const registrations = data.registrations;

    const registrationHtml = 
    registrations.map(r => `
        <div>
            <h3>${r.event_name}</h3>
            <p>📅 ${r.event_date}</p>
            <p>👤 ${r.student_name}</p>
            <p>🎓 Year: ${r.year}</p>
            <p>📱 ${r.phone}</p>
        </div>
        <hr>
    `).join("");

    return `
    <header>
        <h1>All Registrations</h1>
    </header>

    <main>
        ${registrationHtml || "<p>No registrations yet.<p>"}
    </main>
    `
}