import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";

export default function render(viewFn, data, ctx, bodyClass = "") {
  const { request, headers, session, status = 200 } = ctx;

  const content = viewFn(data);

  const links = `
    ${session 
      ? `<form method="POST" action="/logout"><button>sign out</button></form>
        `
        : `<a href="/">home</a>
           <a href="/student-login">sign in</a>
        `}
  `;

  // retrieving flash messages if there are any
  const flash = getFlash(request.headers, headers);

  let className;
  const flashText = flash?.toLowerCase();

  if (flashText?.includes("created") || flashText?.includes("added") || flashText?.includes("logged in")) {
    className = "create";
  } else if (flashText?.includes("updated")) {
    className = "update";
  } else if (flashText?.includes("deleted") || flashText?.includes("Logged out")) {
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
