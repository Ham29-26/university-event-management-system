import { db } from "../tools/db.js";

// gets all registrations in one table
export function getAllRegistrations() {
    return db.prepare(`
        SELECT
            registrations.student_id,
            registrations.phone,
            registrations.year,
            users.name AS student_name,
            events.event_id,
            events.event_name,
            events.event_date
        FROM registrations
        JOIN users
            ON registrations.username = users.username
        JOIN events
            ON registrations.event_id = events.event_id
        ORDER BY events.event_date
    `).all();
}

// gets all the registrations for a particular user (student)
export function getRegistrationsByUser(username) {
    return db.prepare(`
        SELECT 
            registrations.*,
            events.event_name,
            events.event_date,
            events.event_location
        FROM registrations
        JOIN events
            ON registrations.event_id = events.event_id
        WHERE registrations.username = :username;
    `).all({ username });
}

// gets all the registrations for a particular event along with user details (for admins)
export function getRegistrationsByEvent(eventId) {
    return db.prepare(`
    SELECT 
        registrations.student_id,
        registrations.phone,
        registrations.year,
        users.name AS student_name,
        events.event_name,
        events.event_date
    FROM registrations
    JOIN events
        ON registrations.event_id = events.event_id
    JOIN users
        ON registrations.username = users.username
    WHERE registrations.event_id = :eventId
    `).all({ eventId });
}

export function addRegistration({ username, eventId, studentId, phone, year }) {
    db.prepare(`
        INSERT INTO registrations (username, event_id, student_id, phone, year)
        VALUES (:username, :event_id, :student_id, :phone, :year)
    `).run({ 
        username, 
        event_id: eventId, 
        student_id: studentId, 
        phone, 
        year 
    });
}

export function registrationExists(username, eventId) {
    const row = db.prepare(`
        SELECT * FROM registrations
        WHERE username = :username AND event_id = :event_id 
    `).get({ username, event_id: eventId });

    return !!row;
}