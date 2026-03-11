export function redirect(location) {
    const headers = new Headers();
    headers.set('location', location);
    return new Response(null, { headers, status: 303 });
}