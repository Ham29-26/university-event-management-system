import { db } from "./app/tools/db.js";

// Delete contacts first
//db.prepare("DELETE FROM contacts WHERE event_id >= 13").run();

// Now delete events
// db.prepare("DELETE FROM events WHERE event_id = 58").run();

//delete new category
//db.prepare("DELETE FROM categories WHERE category_name = 'SPORTS'").run();

//db.prepare("DELETE FROM categories WHERE category_id >= 17").run();

//db.prepare("DELETE FROM contacts WHERE contact_id = 60").run();

db.exec("DELETE FROM sessions");

console.log("Duplicates removed!");