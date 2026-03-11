import { escape } from "@std/html/entities";
import { formatDate, formatLineBreaks, formatURL } from "../../assets/script.js";

export function adminEventsHomeView(data) {

  let searchText = data.searchItem ? `Search results for "${escape(data.searchItem).trim()}"` : ``;

  let eventsHtml;

  if (data.events.length != 0) {
    eventsHtml =
    data.events.map(event => 
    `
    <article class="${escape(event.category_name).toLowerCase()}">
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
      <form action="/events/admin/event-deletion-confirmation/${event.event_id}/${formatURL(escape(event.event_name))}" method="GET">
        <button type="submit" class="home-admin-buttons" id="delete-btn">DELETE</button>
      </form>

      <form action="/events/admin/event-update-form/${event.category_id}/${event.event_id}/${formatURL(escape(event.event_name))}" method="GET">
        <button type="submit" class="home-admin-buttons" id="update-btn">UPDATE</button>
      </form>
    </div>
    </article>
    `).join("");
  }


  if (data.events.length == 0) {
    searchText = ``;

    eventsHtml =
    `
    <div id="search-error">
    <h2>Search result for "${escape(data.searchItem).trim()}" not found. Please try again.</h2>
    </div>
    `
  }
  

  
  return`
    <div class="page-wrapper">
    <header>
      <h1>Admin events page</h1>
      <br>
      <p>Create, Delete and Update events</p>
    </header>

    <nav>
      <ul>
        <li><a href="/events/admin/events-homepage">Dashboard</a></li>
        <li><a href="/events/admin/event-creation-form">Create Event</a></li>
        <li><a href="#">Log out</a></li>
        <li><a href="/">Student Page</a></li>
      </ul>

      <form action="/events/admin/events-homepage" method="GET">
        <div class="search-container">
          <label for="search-category">Search:</label>
          <input type="search" id="search-category" name="search-admin" placeholder="Type an event to search"/>
          <button type="submit" class="search-btn">Search</button>
        </div>
      </form>
    </nav>

    <main>
      <p id="search-text">${searchText}</p>
      <section id="all-events">
        ${eventsHtml}

        <form action="/events/admin/event-creation-form" method="GET">
          <button type="submit" id="create-btn">+ Create New Event</button>
        </form>
      </section>  
    </main>
    </div>
    `
}



