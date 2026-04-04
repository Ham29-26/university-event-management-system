export function notFoundView() {
    return `
      <section id="not-found">
        <h2>Not Found</h2>
        <p>The requested resource does not exist.</p>

        <button type="button" onclick="location.href='/'" id="go-back-btn">
        Go to Homepage
        </button>
        
      </section>
    `
}