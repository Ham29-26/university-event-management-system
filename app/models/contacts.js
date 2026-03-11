import { db } from "../tools/db.js";

export function getContactsByEventId(eventId) {
    return db.prepare(`
        SELECT *
        FROM contacts
        WHERE event_id = ?
    `).all(eventId);
}

export function addContact(eventId, contactDesignation, contactName, contactEmail, contactPhone) {
    db.prepare(`
        INSERT INTO contacts (
        event_id,
        contact_designation, 
        contact_name, 
        contact_email, 
        contact_phone) 
        
        VALUES 
         (?, ?, ?, ?, ?)
    `).run(eventId, contactDesignation, contactName, contactEmail, contactPhone);
}

//helper method to retrieve contact id
//export function getContactId()

export function updateContact(contactId, contactDesignation, contactName, contactEmail, contactPhone) {
    db.prepare(`
        UPDATE contacts
        SET contact_designation = ?, 
        contact_name = ?,
        contact_email = ?,
        contact_phone = ?

        WHERE contact_id = ?
    `).run(contactDesignation, contactName, contactEmail, contactPhone, contactId);
}

export function deleteContact(contactId) {
    db.prepare(`
        DELETE FROM contacts WHERE contact_id = ?    
    `).run(contactId)
}