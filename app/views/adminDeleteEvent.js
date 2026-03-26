import { escape } from "@std/html/entities";
import { formatURL } from "../../assets/script.js";

export function adminDeleteEventView(data) {
    return `
    <div class="page-wrapper">
      <nav>
        <ul>
          <li><a href="/events/admin/events-homepage">Dashboard</a></li>
          <li><a href="/events/admin/event-creation-form">Create Event</a></li>
          <li><a href="#">Log out</a></li>
          <li><a href="/">Student Page</a></li>
        </ul>
      </nav>

    <main>
      <section id="delete-message">
        <p>Are you sure you want to delete the event <strong>"${escape(data.event.event_name)}"</strong>?</p>
        <br><p>This action will permanently remove all the data related to this event.</p>
        <br><p>You can cancel this action or review the event details before deleting.</p>
      </section>

      <div class="delete-btn-container">
        <form method="POST">
          <button type="submit" class="delete-form-btns" id="form-delete-btn">Delete Event</button>
        </form>

        <form action="/events/admin/events-homepage" method="GET">
          <button class="delete-form-btns" id="cancel-btn">Cancel & Return</button>
        </form>

        <form action="/events/admin/events-details/${data.event.event_id}/${formatURL(escape(data.event.event_name))}" method="GET">
          <button class="delete-form-btns" id="form-view-details-btn">View Details</button>
        </form>
      </div>

    </main>
    </div>
    `
}
