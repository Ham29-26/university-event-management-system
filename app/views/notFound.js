export function notFoundView(data) {

  let links;
  
  if (data.session && data.session.role == "student") {
    links = `/events/events-homepage`;

  } else if (data.session && data.session.role == "admin") {
    links = `/events/admin/events-homepage`;

  } else if (!data.session) {
    links = `/`;
  }

    return `
    <main>
      <section id="not-found">
        <h2>Not Found</h2>
        <p>The requested resource does not exist.</p>

        <button type="button" onclick="location.href='${links}'" id="go-back-btn">
        Go to Homepage
        </button>
        
      </section>
    </main>
    `
}