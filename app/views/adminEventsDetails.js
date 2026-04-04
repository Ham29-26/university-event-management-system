import { escape } from "@std/html/entities";
import { formatDate, formatLineBreaks, formatTime, formatURL } from "../../assets/script.js";

export function adminEventsDetailsView(data) {

  let contentHtml = ``;

  if (data.events.event_section1_title != null ||
    data.events.event_section1_content != null
  ) {
    contentHtml += `
    <h2>${escape(data.events.event_section1_title)}</h2>
      <p>
        ${formatLineBreaks(escape(data.events.event_section1_content))}
      </p>
    `;
  }

  if (data.events.event_section2_title != null ||
    data.events.event_section2_content != null
  ) {
    contentHtml += `
    <h2>${escape(data.events.event_section2_title)}</h2>
      <p>
        ${formatLineBreaks(escape(data.events.event_section2_content))}
      </p>
    `;
  }

  if (data.events.event_section3_title != null ||
    data.events.event_section3_content != null
  ) {
    contentHtml += `
    <h2>${escape(data.events.event_section3_title)}</h3>
      <p>
        ${formatLineBreaks(escape(data.events.event_section3_content))}
      </p>
    `;
  }
  
  const eventTime = data.events.event_end_time ? 
  `${formatTime(escape(data.events.event_start_time))} – ${formatTime(escape(data.events.event_end_time))}` 
  : `${formatTime(escape(data.events.event_start_time))}`;

  let contactHtml = ``;

  if (data.contact1) {
    contactHtml += `
    <p>
      <strong>${escape(data.contact1.contact_designation)}</strong><br>
      ${escape(data.contact1.contact_name)}<br>
      📞 ${escape(data.contact1.contact_phone)}<br>
      ✉ <a href="mailto:${escape(data.contact1.contact_email)}">
           ${escape(data.contact1.contact_email)}
         </a>
    </p>
    `;
  }


  if (data.contact2) {
    contactHtml += `
    <p>
      <strong>${escape(data.contact2.contact_designation)}</strong><br>
      ${escape(data.contact2.contact_name)}<br>

      ${escape(data.contact2.contact_phone) ? `📞 ${escape(data.contact2.contact_phone)}<br>` : ""}

      ${escape(data.contact2.contact_email) ? `
        ✉ <a href="mailto:${escape(data.contact2.contact_email)}">
           ${escape(data.contact2.contact_email)}
         </a>` : ""
      }
    </p>
    `;
  }


    return `
    <nav>
      <ul class="navigation-links">
        <li><a href="/events/admin/events-homepage">Dashboard</a></li>
        <li><a href="/events/admin/event-creation-form">Create Event</a></li>
        <li><a href="/logout">Log Out</a></li>
      </ul>
    </nav>

    <main>
      <section class="event-image">
        <img
          src="${escape(data.events.event_image_link)}"
          alt="Event-Image"
        >
      </section>

      <section class="event-layout">
        <article class="event-description">
          <h1>${escape(data.events.event_name)}</h1>

          <p>
            ${formatLineBreaks(escape(data.events.event_long_description))}
          </p>

          ${contentHtml}

          <h2>Registration Deadline</h2>
          <p>
            Registration closes on ${formatDate(escape(data.events.registration_deadline))}.
          </p>
        </article>

        <aside class="event-sidebar">
          <h3>Event Information</h3>

          <p>📅 <strong>Date:</strong> ${formatDate(escape(data.events.event_date))}</p>
          <p>⏰ <strong>Time:</strong> ${eventTime}</p>
          <p>📍 <strong>Location:</strong> ${escape(data.events.event_location)}</p>

          <hr />

          <h3>Need More Information?</h3>

          ${contactHtml}
        </aside>
      </section>

      <div class="details-button-container">

        <button type="button"
        onclick="location.href='/events/admin/event-deletion-confirmation/${data.events.event_id}/${formatURL(escape(data.events.event_name))}'" 
        class="details-admin-buttons" id="delete-btn-details">
        DELETE
        </button>

        <button type="button"
        onclick="location.href='/events/admin/event-update-form/${data.events.category_id}/${data.events.event_id}/${formatURL(escape(data.events.event_name))}'" 
        class="details-admin-buttons" id="update-btn-details">
        UPDATE
        </button>

      </div>
    </main>
    `
}