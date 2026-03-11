export function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

export function formatURL(eventName) {
    return eventName.toLowerCase().replaceAll(" ", "-");
}

export function formatLineBreaks(text) {
    return text.replaceAll("\n", `<br>`);
}

export function formatTime(time24) {
    if (!time24) return "";

    const [hourStr, minute] = time24.split(":");

    let hour = parseInt(hourStr);

    const amPm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minute} ${amPm}`;
}

export function firstLetterUpperCase(str) {
    return str.toLowerCase().split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}