export function notFoundView() {
    return `
    <div class="page-wrapper">
      <section id="not-found">
        <h2>Not Found</h2>
        <p>The requested resource does not exist.</p>

        <button type="button" onclick="location.href='/'" id="go-back-btn">
        Go to Homepage
        </button>
        
      </section>
    </div>
    `
}