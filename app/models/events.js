import { db } from "../tools/db.js";

export function getEvents() {
    return db.prepare(`
        SELECT events.*,
        categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
        ORDER BY events.event_date ASC
    `).all();
}

export function getEventByEventId(eventId) {
    return db.prepare(`
        SELECT events.*,
        categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
        WHERE events.event_id = ?    
    `).get(eventId);
}

export function getEventByCategoryId(categoryId) {
    return db.prepare(`
        SELECT events.*,
        categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
        WHERE events.category_id = ?
        ORDER BY events.event_date ASC 
    `).all(categoryId);
}


export function addEvent(
    categoryId,
    eventName,
    eventDate,
    eventShortDesc,
    eventImage,

    eventLongDesc,
    section1Title,
    section1Content,
    section2Title,
    section2Content,
    section3Title,
    section3Content,
    registrationDeadline,

    eventStartTime,
    eventEndTime,
    eventLocation
) {

    db.prepare(`
        INSERT INTO events (
        category_id,
        event_name,
        event_date,
        event_short_description,
        event_image_link,

        event_long_description,
        event_section1_title,
        event_section1_content,
        event_section2_title,
        event_section2_content,
        event_section3_title,
        event_section3_content,
        registration_deadline,

        event_start_time,
        event_end_time,
        event_location

        ) VALUES

        (?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?)
    `).run(
    categoryId,
    eventName,
    eventDate,
    eventShortDesc,
    eventImage,

    eventLongDesc,
    section1Title,
    section1Content,
    section2Title,
    section2Content,
    section3Title,
    section3Content,
    registrationDeadline,

    eventStartTime,
    eventEndTime,
    eventLocation
   );

   // returning the id of the last inserted row ie the new event id
   const lastId = db.prepare("SELECT last_insert_rowid() AS id").get().id;
   return lastId;
}

export function deleteEvent(eventId) {
    // first delete any contacts associated with the event
    db.prepare(`
        DELETE FROM contacts WHERE event_id = ?
    `).run(eventId);

    // then delete the event itself
    db.prepare(`
        DELETE FROM events WHERE event_id = ?        
    `).run(eventId);
}

export function updateEvent(
    categoryId,
    eventName,
    eventDate,
    eventShortDesc,
    eventImage,

    eventLongDesc,
    section1Title,
    section1Content,
    section2Title,
    section2Content,
    section3Title,
    section3Content,
    registrationDeadline,

    eventStartTime,
    eventEndTime,
    eventLocation,

    eventId
) 
    
    {
    
        db.prepare(`
        UPDATE events
        SET category_id = ?,
        event_name = ?,
        event_date = ?,
        event_short_description = ?,
        event_image_link = ?,

        event_long_description = ?,
        event_section1_title = ?,
        event_section1_content = ?,
        event_section2_title = ?,
        event_section2_content = ?,
        event_section3_title = ?,
        event_section3_content = ?,
        registration_deadline = ?,

        event_start_time = ?,
        event_end_time = ?,
        event_location = ?

        WHERE event_id = ?
        `).run(
            categoryId,
            eventName,
            eventDate,
            eventShortDesc,
            eventImage,

            eventLongDesc,
            section1Title,
            section1Content,
            section2Title,
            section2Content,
            section3Title,
            section3Content,
            registrationDeadline,

            eventStartTime,
            eventEndTime,
            eventLocation,

            eventId
        );
}