import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";

export default function render(viewFn, data, ctx, bodyClass = "") {
  const { request, headers, session, user, status = 200 } = ctx;

  const content = viewFn(data);

  let homeLink;
  let registrationLink;

  if (session && user.role == "student") {
    homeLink = "/events/events-homepage";
    registrationLink = `<a href="/events/my-registrations">My Registrations</a>`;
  } else if (session && user.role == "admin") {
    homeLink = "/events/admin/events-homepage";
    registrationLink = `<a href="/events/admin/registrations">Registrations</a>`;
  }


  const links = `
    ${session 
      ? `<a href="${homeLink}">Home</a>
         ${registrationLink}

         <a href="/events/profile" class="profile-link">
          <figure class="profile-widget">
            <img src="${user.profile_image_url}" alt="Profile picture">
            <figcaption>
              <span class="username">${user.username}</span>
              <span class="role">${user.role}</span>
            </figcaption>
          </figure>
        </a>
        
         <form method="POST" action="/logout"><button>Sign Out</button></form>
        `
        : `<a href="/">Home</a>
           <a href="/student-login">Sign In</a>
        `}
  `;

  // retrieving flash messages if there are any
  const flash = getFlash(request.headers, headers);

  let className;
  const flashText = flash?.toLowerCase();

  if (flashText?.includes("created") || flashText?.includes("added") || flashText?.includes("logged in") || flashText?.includes("registered")) {
    className = "create";
  } else if (flashText?.includes("updated")) {
    className = "update";
  } else if (flashText?.includes("deleted") || flashText?.includes("Logged out") || flashText?.includes("cancelled")) {
    className = "delete";
  }

  const flashMessage = flash ?
  `<aside id="flash" class="${className}">
      <p>${escape(flash)}</p>
   </aside>`
   : '';

  headers.set("content-type", "text/html");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="author" content="Hamza Kazi">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>University Events Management System</title>
        <link rel="stylesheet" href="/assets/styles.css">
        <link rel="icon" href="/assets/favicon2.svg">
      </head>

      <body class="${bodyClass}">

      <header class="global-header">
          <h1>Imaginary University Event Management System</h1>
          <nav>
            ${links}
          </nav>
      </header>

        ${flashMessage}

        ${content}

        <footer>
         <div id="footer-top-row-container">
          <address id="uni-address">
            <h4>Address</h4>
            123 University Avenue<br />
            Dubai, UAE<br />
            LE1 XXX<br />
          </address>

          <address id="contact-info">
            <h4>Contact Information</h4>
            Email:
            <a href="mailto:info@imaginaryuniversity.ae"
              >info@imaginaryuniversity.ae</a
            ><br />
            Phone: +971561234567
          </address>
         </div>

         <p>© 2026 Imaginary University. All rights reserved.</p>
        </footer>
      
      <script src="/assets/script.js"></script>
      </body>
    </html>
  `;

  return new Response(html, { headers, status });
}
