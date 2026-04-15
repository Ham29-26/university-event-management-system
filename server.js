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
import { addSessionController, deleteSessionController, adminLoginFormController, studentLoginFormController } from "./app/controllers/sessions.js";
import { addUserController, signUpController } from "./app/controllers/users.js";
import { loginSchema } from "./app/schema/loginSchema.js";
import { excludesSession, requiresAdmin, requiresSession, withSession } from "./app/middleware/auth.js";
import { signUpSchema } from "./app/schema/signUpSchema.js";
import { indexController } from "./app/controllers/index.js";
import { addUpdateProfileImageController, profileController } from "./app/controllers/profile.js";
import { withUser } from "./app/middleware/withUser.js";
import { profileSchema } from "./app/schema/profileSchema.js";
import { addRegistrationController, registrationController } from "./app/controllers/register.js";
import { registerSchema } from "./app/schema/registerSchema.js";
import { adminRegistrationsController, studentRegistrationsController } from "./app/controllers/registrations.js";

const eventsApp = new EventsRouter();

// running all global middleware functions
eventsApp.use(withHeaders);
eventsApp.use(withLogs);
eventsApp.use(withSession);
eventsApp.use(withUser);

// universal pages
eventsApp.get("/assets/*", staticController);
eventsApp.get("/", indexController, excludesSession);

// profile page for both students and admins
eventsApp.get("/events/profile", profileController, requiresSession);
eventsApp.post("/events/profile", profileController, requiresSession, validate(profileSchema), addUpdateProfileImageController);

// student facing pages
eventsApp.get("/events/events-homepage", eventsHomeController, requiresSession);
eventsApp.get("/events/events-details/*", eventsDetailsController, requiresSession);
eventsApp.get("/events/category=:category/:categoryId", eventsCategoriesController, requiresSession);

eventsApp.get("/register", registrationController, requiresSession);
eventsApp.post("/register", registrationController, requiresSession, validate(registerSchema), addRegistrationController);
eventsApp.get("/register/*", registrationController, requiresSession);
eventsApp.post("/register/*", registrationController, requiresSession, validate(registerSchema), addRegistrationController);

eventsApp.get("/events/my-registrations", studentRegistrationsController, requiresSession);

// admin facing pages
eventsApp.get("/events/admin/events-homepage", adminEventsHomeController, requiresAdmin);
eventsApp.get("/events/admin/events-details/*", adminEventsDetailsController, requiresAdmin);

eventsApp.get("/events/admin/event-creation-form", adminCreateEventController, requiresAdmin);
eventsApp.post("/events/admin/event-creation-form", adminCreateEventController, requiresAdmin, validate(eventSchema), addEventsController);

eventsApp.get("/events/admin/event-update-form/*", adminUpdateEventController, requiresAdmin);
eventsApp.post("/events/admin/event-update-form/*", adminUpdateEventController, requiresAdmin, validate(updateEventSchema), addUpdateEventController);

eventsApp.get("/events/admin/add-new-category-form", adminNewCategoryController, requiresAdmin);
eventsApp.post("/events/admin/add-new-category-form", adminNewCategoryController, requiresAdmin, validate(newCategorySchema), addNewCategoryController);

eventsApp.get("/events/admin/event-deletion-confirmation/*", adminDeleteEventController, requiresAdmin);
eventsApp.post("/events/admin/event-deletion-confirmation/*", addDeleteEventController, requiresAdmin);

eventsApp.get("/events/admin/registrations", adminRegistrationsController, requiresAdmin);

eventsApp.get("/sign-up", signUpController, excludesSession);
eventsApp.post("/sign-up", signUpController, excludesSession, validate(signUpSchema), addUserController);

eventsApp.get("/student-login", studentLoginFormController, excludesSession);
eventsApp.post("/student-login", studentLoginFormController, excludesSession, validate(loginSchema), (ctx, next) => {
    ctx.loginType= "student";
    return addSessionController(ctx, next);
});

eventsApp.get("/admin-login", adminLoginFormController, excludesSession);
eventsApp.post("/admin-login", adminLoginFormController, excludesSession, validate(loginSchema), (ctx, next) => {
    ctx.loginType = "admin";
    return addSessionController(ctx, next);
});

eventsApp.post("/logout", deleteSessionController, requiresSession);

eventsApp.get("*", notFoundController);
eventsApp.post("*", notFoundController);


export default function server(request) {
    return eventsApp.handle({ request });
}