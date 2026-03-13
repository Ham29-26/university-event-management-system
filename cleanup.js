import { db } from "./app/tools/db.js";

// Delete contacts first
//db.prepare("DELETE FROM contacts WHERE event_id >= 13").run();

// Now delete events
//db.prepare("DELETE FROM events WHERE event_id >= 40").run();

//delete new category
//db.prepare("DELETE FROM categories WHERE category_name = 'SPORTS'").run();

db.prepare("DELETE FROM categories WHERE category_id >= 17").run();

//db.prepare("DELETE FROM contacts WHERE contact_id >= 18").run();

console.log("Duplicates removed!");