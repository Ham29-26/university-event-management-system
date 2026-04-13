import { escape } from "@std/html/entities";
import { formatURL } from "../../assets/script.js";

export function adminDeleteEventView(data) {
    return `
      <nav class="main-nav">
        <ul class="navigation-links">
          <li><a href="/events/admin/events-homepage">Dashboard</a></li>
          <li><a href="/events/admin/event-creation-form">Create Event</a></li>
        </ul>
      </nav>

    <main>
      <section id="delete-message">
        <p class="space-between">Are you sure you want to delete the event <strong>"${escape(data.event.event_name)}"</strong>?</p>
        <p class="space-between">This action will permanently remove all the data related to this event.</p>
        <p class="space-between">You can cancel this action or review the event details before deleting.</p>
      </section>

      <div class="delete-btn-container">

        <form method="POST">
          <button type="submit" class="delete-form-btns" id="form-delete-btn">Delete Event</button>
        </form>

        <button type="button" 
        onclick="location.href='/events/admin/events-homepage'"
        class="delete-form-btns" id="cancel-btn">
        Cancel & Return
        </button>


        <button type="button" 
        onclick="location.href='/events/admin/events-details/${data.event.event_id}/${formatURL(escape(data.event.event_name))}'" 
        class="delete-form-btns" id="form-view-details-btn">
        View Details
        </button>

      </div>

    </main>
    `
}
