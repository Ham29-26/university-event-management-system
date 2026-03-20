import { fragments } from "./errors.js";

export function adminNewCategoryView({ errors = {} }) {

  // extracting the error messages
  const f = fragments(errors);

  const newCategory = f["new-category-name"] || {};

    return `
    <div class="page-wrapper">
    <header>
      <nav>
        <ul>
          <li><a href="/events/admin/events-homepage">Dashboard</a></li>
          <li><a href="/events/admin/event-creation-form">Create Event</a></li>
          <li><a href="#">Log out</a></li>
          <li><a href="/">Student Page</a></li>
        </ul>
      </nav>
    </header>

    <main>
        <h1 id="category-header">Add a new Category</h1><br>
          <form id="category-form" method="POST">
           <div class="form-label-row">
            <label for="new-category-name">Category Name: </label>
            <input type="text" id="new-category-name" name="new-category-name"${newCategory.value || ""}>

            <br>${newCategory.message || ""}
           </div>

            <br>

            <div id="category-btn-row">
              <a href="/events/admin/event-creation-form" id="category-back-btn" class="button">Back to form</a>
              <button id="category-submit-btn" type="submit">Submit</button>
            </div>
          </form>
    </main>
    </div>
    `
}