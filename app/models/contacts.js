import { db } from "../tools/db.js";

export function getContactsByEventId(eventId) {
    return db.prepare(`
        SELECT *
        FROM contacts
        WHERE event_id = ?
    `).all(eventId);
}

export function addContact(eventId, contactName, contactDesignation, contactEmail, contactPhone) {
    db.prepare(`
        INSERT INTO contacts (
        event_id,
        contact_name,
        contact_designation,  
        contact_email, 
        contact_phone) 
        
        VALUES 
         (?, ?, ?, ?, ?)
    `).run(eventId, contactName, contactDesignation, contactEmail, contactPhone);
}

export function updateContact(contactId, contactName, contactDesignation, contactEmail, contactPhone) {
    db.prepare(`
        UPDATE contacts
        SET contact_name = ?,
        contact_designation = ?,
        contact_email = ?,
        contact_phone = ?

        WHERE contact_id = ?
    `).run(contactName, contactDesignation, contactEmail, contactPhone, contactId);
}

export function deleteContact(contactId) {
    db.prepare(`
        DELETE FROM contacts WHERE contact_id = ?    
    `).run(contactId)
}