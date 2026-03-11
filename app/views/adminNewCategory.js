export function adminNewCategoryView(data) {

  const errorMessage = data.message || "";

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
            <input type="text" id="new-category-name" name="new-category-name">

            <br><p>${errorMessage}</p>
           </div>

            <br><button id="category-submit-btn" type="submit">Submit</button>
          </form>
    </main>
    </div>
    `
}