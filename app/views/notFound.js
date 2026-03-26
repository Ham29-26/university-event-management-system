export function notFoundView() {
    return `
    <div class="page-wrapper">
      <section id="not-found">
        <h2>Not Found</h2>
        <p>The requested resource does not exist.</p>

        <form action="/" method="GET">
          <button id="go-back-btn">Go to Homepage</button>
        </form>
      </section>
    </div>
    `
}