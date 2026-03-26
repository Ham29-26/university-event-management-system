import { escape } from "@std/html/entities";
import { formatDate, formatURL } from "../../assets/script.js";

export function eventsCategoriesView(data) {
    
    const categoriesNav = data.categories.map(category => `
        <li><a href="/events/category=${formatURL(escape(category.category_name))}/${category.category_id}">${escape(category.category_name)}</a></li>
        `).join("");


    let eventsHtml;

    // checking if there are any events for the selected category
    if (data.events.length == 0) {
      eventsHtml = `<p id="no-events-error">There are currently no events available for the category <strong>"${escape(data.selectedCategory.category_name)}"</strong></p>`
      
    } else {
      eventsHtml = data.events.map(event => 
        `
        <a href="/events/events-details/${event.event_id}/${formatURL(escape(event.event_name))}">
            <article class="event-card">
                <img src="${escape(event.event_image_link)}" alt="${escape(event.event_name)}" width="200" height="100">
                <p class="category">${escape(event.category_name).toUpperCase()}</p>
                <time datetime="${escape(event.event_date)}">
                ${formatDate(escape(event.event_date))}
                </time>
                <h3>${escape(event.event_name)}</h3>
                <p class="short-desc">${escape(event.event_short_description)}</p>
                <p class="view-details">View Details</p>
            </article>
            </a>
        `).join("");
    }

      
      return`
       <div class="page-wrapper">
        <header>
          <h1>Events at Imaginary University</h1>
          <br>
          <p>Explore upcoming events and register to participate</p>
        </header>
    
        <nav>
          <ul>
            <li><a href="/">All Events</a></li>
            ${categoriesNav}
          </ul>
    
          <form action="/" method="GET">
            <div class="search-container">
              <label for="search-category">Search:</label>
              <input type="search" id="search-category" name="search-student" placeholder="Type an event to search"/>
              <button class="search-btn">Search</button>
            </div>
          </form>
        </nav>
    
        <main>
          <section id="all-events">
            <h2>All ${data.selectedCategory.category_name} Events</h2>
            ${eventsHtml}
          </section>  
        </main>
       </div> 
        `
}