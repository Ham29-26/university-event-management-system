import { escape } from "@std/html/entities";
import { formatDate, formatLineBreaks, formatTime, formatURL } from "../../assets/script.js";

export function eventsDetailsView(data) {

  const categoriesNav = data.categories.map(category => `
    <li><a href="/events/category=${escape(category.category_name).toLowerCase()}/${category.category_id}">${escape(category.category_name)}</a></li>
    `).join("");

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
        <li><a href="/">All Events</a></li>
        ${categoriesNav}
      </ul>
    </nav>

    <main>
      <section class="event-image">
        <img
          src="${escape(data.events.event_image_link)}"
          alt="Event-Image"
        >
      </section>

      <section class="event-content-wrapper">
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

        <aside class="event-aside">
          <h3>Event Information</h3>

          <p>📅 <strong>Date:</strong> ${formatDate(escape(data.events.event_date))}</p>
          <p>⏰ <strong>Time:</strong> ${eventTime}</p>
          <p>📍 <strong>Location:</strong> ${escape(data.events.event_location)}</p>

          <hr />

          <h3>Need More Information?</h3>

          ${contactHtml}
        </aside>
      </section>

      <button type="button"
      onclick="location.href='/register/${data.events.event_id}/${formatURL(data.events.event_name)}'"
      id="register-button">
      Register Now
      </button>
    </main>
    `
}