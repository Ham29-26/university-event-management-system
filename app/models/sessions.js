import { db } from "../tools/db.js";

export function createSession(user) {
    const sessionId = crypto.randomUUID();
    db.prepare(`
        INSERT INTO sessions (id, username, role) 
        VALUES (:id, :username, :role)
    `).run({ 
        id: sessionId, 
        username: user.username,
        role: user.role 
    });

    return sessionId;
}

export function getSession(sessionId) {
    return db.prepare(`
        SELECT * FROM sessions WHERE id=:sessionId
    `).get({ sessionId });
}

export function deleteSession(sessionId) {
    db.prepare("DELETE FROM sessions WHERE id=:sessionId").run({ sessionId });
}