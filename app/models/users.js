import { db } from "../tools/db.js";

const salt = "someKindovseekritvalooo"

const options = {
    name: "PBKDF2",
    hash: "SHA-256",
    iterations: 5000,
    salt: new Uint8Array(Array.from(new TextEncoder().encode(salt)))
}


export async function createUser({ username, password, name, email, role }) {
    const hashedPassword = await hashPassword(password)
    
    db.prepare(`
        INSERT INTO users (username, hashedPassword, name, email, role) 
        VALUES (:username, :hashedPassword, :name, :email, :role)
    `).run({ username, hashedPassword, name, email, role });
}

export function updateProfilePicture({ username, profileImagePath }) {
    db.prepare(`
        UPDATE users
        SET profile_image_url = :profileImagePath
        WHERE username = :username
    `).run({ username, profileImagePath });
}

export function usernameExists(username) {
    const user = db.prepare(`
        SELECT * FROM users WHERE username=:username
    `).get({ username });

    return !!user;
}

export function getUser(username) {
    return db.prepare(`
        SELECT * FROM users WHERE username=:username
    `).get({ username });
}

export function getUserByUsername(username) {
    return db.prepare(`
        SELECT username, name, email, role, profile_image_url
        FROM users
        WHERE username=:username
    `).get({ username });
}

export async function checkCredentials({ username, password }) {
    const user = getUser(username);
    if(!user) return false;

    const hashed = await hashPassword(password);

    if (user.hashedPassword !== hashed) return false;

    return user;
}

async function hashPassword(password) {
    const inputBytes = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey("raw", inputBytes, "PBKDF2", false, ['deriveBits']);
    const buffer = await crypto.subtle.deriveBits(options, key, 256);
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, 0)).join("");
}