import { adminEventsHomeController } from "./app/controllers/adminEventsHome.js";
import { adminEventsDetailsController } from "./app/controllers/adminEventsDetails.js";
import { eventsCategoriesController } from "./app/controllers/eventsCategories.js";
import { eventsDetailsController } from "./app/controllers/eventsDetails.js";
import { eventsHomeController } from "./app/controllers/eventsHome.js";
import { staticController } from "./app/controllers/static.js";
import { addEventsController, adminCreateEventController } from "./app/controllers/adminCreateEvent.js"
import { addUpdateEventController, adminUpdateEventController } from "./app/controllers/adminUpdateEvent.js";
import { addNewCategoryController, adminNewCategoryController } from "./app/controllers/adminNewCategory.js";
import { addDeleteEventController, adminDeleteEventController } from "./app/controllers/adminDeleteEvent.js";

export default function server(request) {

    const url = new URL(request.url);
    console.log(`\n${request.method} ${url.pathname} ${url.search}`);

    if(url.pathname.startsWith("/assets")) {
        return staticController({ request });
    }

    if(url.pathname == "/") {
        return eventsHomeController({ request });
    }

    if(url.pathname.startsWith("/events/events-details") && request.method == "GET") {
        return eventsDetailsController({ request });
    }

    if(url.pathname.startsWith("/events/category=") && request.method == "GET") {
        return eventsCategoriesController({ request });
    }

    if(url.pathname == "/events/admin/events-homepage" && request.method == "GET") {
        return adminEventsHomeController({ request });
    }

    if(url.pathname.startsWith("/events/admin/events-details") && request.method == "GET") {
        return adminEventsDetailsController({ request });
    }

    if(url.pathname == "/events/admin/event-creation-form" && request.method == "GET") {
        return adminCreateEventController({ request });
    }

    if(url.pathname.startsWith("/events/admin/event-creation-form") && request.method == "POST") {
        return addEventsController({ request });
    }

    if(url.pathname.startsWith("/events/admin/event-update-form") && request.method == "GET") {
        return adminUpdateEventController({ request });
    }

    if(url.pathname.startsWith("/events/admin/event-update-form") && request.method == "POST") {
        return addUpdateEventController({ request });
    }

    if(url.pathname == "/events/admin/add-new-category-form" && request.method == "GET") {
        return adminNewCategoryController({ request });
    }

    if(url.pathname == "/events/admin/add-new-category-form" && request.method == "POST") {
        return addNewCategoryController({ request });
    }

    if(url.pathname.startsWith("/events/admin/event-deletion-confirmation") && request.method == "GET") {
        return adminDeleteEventController({ request });
    }
    
    if(url.pathname.startsWith("/events/admin/event-deletion-confirmation") && request.method == "POST") {
        return addDeleteEventController({ request });
    }


    return new Response("Not Found", {status: 404});
}