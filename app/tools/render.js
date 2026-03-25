import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";

export default function render(viewFn, data, ctx, bodyClass = "") {
  const { request, headers, status = 200 } = ctx;

  const content = viewFn(data);

  // retrieving flash messages if there are any
  const flash = getFlash(request.headers, headers);

  let className;
  const flashText = flash?.toLowerCase();

  if (flashText?.includes("created") || flashText?.includes("added")) {
    className = "create";
  } else if (flashText?.includes("updated")) {
    className = "update";
  } else if (flashText?.includes("deleted")) {
    className = "delete";
  }

  const flashMessage = flash ?
  `<aside id="flash" class=${className}>
      <p>${escape(flash)}</p>
   </aside>`
   : '';

  headers.set("content-type", "text/html");
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>University Events Management System</title>
        <link rel="stylesheet" href="/assets/styles.css">
        <link rel="icon" href="/assets/favicon2.svg">
      </head>

      <body class="${bodyClass}">

        ${flashMessage}

        ${content}

        <footer>
        <div id="top-row-container">
        <address id="uni-address">
          <h4>Address</h4>
          123 University Avenue<br />
          Leicester, UK<br />
          LE1 XXX<br />
        </address>

        <address id="contact-info">
          <h4>Contact Information</h4>
          Email:
          <a href="mailto:info@imaginaryuniversity.ac.uk"
            >info@imaginaryuniversity.ac.uk</a
          ><br />
          Phone: +44 1234 567890
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
