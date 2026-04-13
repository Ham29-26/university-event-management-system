import { escape } from "@std/html/entities";
import { formatDate, formatLineBreaks, formatURL } from "../../assets/script.js";

export function adminEventsHomeView(data) {

  let searchText;

  if (data.searchItem && data.events.length != 0) {
    searchText = `Search results for "${escape(data.searchItem).trim()}"`;

  } else if (data.searchItem && data.events.length == 0) {
    searchText = `Search result for "${escape(data.searchItem).trim()}" not found. Please try again.`;

  } else if (!data.searchItem) {
    searchText = ``;
  }


  let eventsHtml;

  if (data.events.length != 0) {
    eventsHtml =
    data.events.map(event => 
    `
    <article class="event-card">
    <a href="/events/admin/events-details/${event.event_id}/${formatURL(escape(event.event_name))}">
            <img src="${escape(event.event_image_link)}" alt="${escape(event.event_name)}" width="200" height="100">
            <p class="category">${escape(event.category_name).toUpperCase()}</p>
            <time datetime="${escape(event.event_date)}">
            ${formatDate(escape(event.event_date))}
            </time>
            <h3>${escape(event.event_name)}</h3>
            <p class="short-desc">${formatLineBreaks(escape(event.event_short_description))}</p>
            <p class="view-details">View Details</p>
    </a>

    <div class="home-button-container">

      <button type="button" 
      onclick="location.href='/events/admin/event-deletion-confirmation/${event.event_id}/${formatURL(escape(event.event_name))}'" 
      class="home-admin-buttons" id="delete-btn-home">
      DELETE
      </button>

      <button type="button" 
      onclick="location.href='/events/admin/event-update-form/${event.category_id}/${event.event_id}/${formatURL(escape(event.event_name))}'" 
      class="home-admin-buttons" id="update-btn-home">
      UPDATE
      </button>

    </div>
    </article>
    `).join("");
  }


  
  return`
    <header>
      <h1>Admin events page</h1>
      <p>Create, Delete and Update events</p>
    </header>

    <nav class="main-nav">
      <ul class="navigation-links">
        <li><a href="/events/admin/events-homepage">Dashboard</a></li>
        <li><a href="/events/admin/event-creation-form">Create Event</a></li>
      </ul>

      <form action="/events/admin/events-homepage" method="GET" class="search-bar">
        <div class="search-container">
          <label for="search-category">Search:</label>
          <input type="search" id="search-category" name="search-admin" placeholder="Type an event to search">
          <button class="search-btn">Search</button>
        </div>
      </form>
    </nav>

    <main>
      <section id="all-events">
        <h2>${searchText || "All Events"}</h2>
        ${eventsHtml || `<p id="no-events-error">No events available for the search result.</p>`}

        <button type="button" onclick="location.href='/events/admin/event-creation-form'" id="create-btn">
        + Create New Event
        </button>
      </section>  
    </main>
    `
}



