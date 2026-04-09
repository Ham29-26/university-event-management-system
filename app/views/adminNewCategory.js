import { fragments } from "./errors.js";

export function adminNewCategoryView({ errors = {} }) {

  // extracting the error messages
  const f = fragments(errors);

  const newCategory = f["new-category-name"] || {};

    return `
      <nav>
        <ul class="navigation-links">
          <li><a href="/events/admin/events-homepage">Dashboard</a></li>
          <li><a href="/events/admin/event-creation-form">Create Event</a></li>
        </ul>
      </nav>

    <main>
        <h1 id="category-header">Add a new Category</h1><br>
          <form id="category-form" method="POST">
           <div class="form-label-row">
            <label for="new-category-name">Category Name: </label>

             <div class="input-group">
               <input type="text" id="new-category-name" name="new-category-name"${newCategory.value || ""}>
               ${newCategory.message || ""}
             </div>
           </div>

           <div id="category-btn-row">
             <button type="button" onclick="location.href='/events/admin/event-creation-form'" 
             class="new-category-btns">
             Back to form
             </button>

             <button type="submit" class="new-category-btns">Submit</button>
           </div>
          </form>
    </main>
    `
}