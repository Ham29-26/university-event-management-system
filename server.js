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
import EventsRouter from "./router.js";
import { notFoundController } from "./app/controllers/notFound.js";
import { withLogs } from "./app/middleware/logging.js";
import { withHeaders } from "./app/middleware/headers.js";
import { validate } from "./app/middleware/validate.js";
import { eventSchema } from "./app/schema/eventSchema.js";
import { newCategorySchema } from "./app/schema/newCategorySchema.js"
import { updateEventSchema } from "./app/schema/updateEventSchema.js";

const eventsApp = new EventsRouter();

// running all global middleware functions
eventsApp.use(withHeaders);
eventsApp.use(withLogs);

// student facing pages
eventsApp.get("/assets/*", staticController);
eventsApp.get("/", eventsHomeController);
eventsApp.get("/events/events-details/*", eventsDetailsController);
eventsApp.get("/events/category=:category/:categoryId", eventsCategoriesController);

// admin facing pages
eventsApp.get("/events/admin/events-homepage", adminEventsHomeController);
eventsApp.get("/events/admin/events-details/*", adminEventsDetailsController);

eventsApp.get("/events/admin/event-creation-form", adminCreateEventController);
eventsApp.post("/events/admin/event-creation-form", adminCreateEventController, validate(eventSchema), addEventsController);

eventsApp.get("/events/admin/event-update-form/*", adminUpdateEventController);
eventsApp.post("/events/admin/event-update-form/*", adminUpdateEventController, validate(updateEventSchema), addUpdateEventController);

eventsApp.get("/events/admin/add-new-category-form", adminNewCategoryController);
eventsApp.post("/events/admin/add-new-category-form", adminNewCategoryController, validate(newCategorySchema), addNewCategoryController);

eventsApp.get("/events/admin/event-deletion-confirmation/*", adminDeleteEventController);
eventsApp.post("/events/admin/event-deletion-confirmation/*", addDeleteEventController);

eventsApp.get("*", notFoundController);
eventsApp.post("*", notFoundController);


export default function server(request) {
    return eventsApp.handle({ request });
}