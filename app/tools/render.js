export default function render(viewFn, data, request, bodyClass = "", status = 200) {

  const content = viewFn(data);
  const headers = new Headers();

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
