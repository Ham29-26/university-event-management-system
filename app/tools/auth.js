import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";
import { createSession, deleteSession, getSession } from "../models/sessions.js";

export function login(headers, username) {
    // create a session record
    const sessionId = createSession(username);
    // add cookie to response
    setCookie(headers, {
        name: "sessionId",
        value: sessionId,
        path: "/"
    })
    console.log("created session");
}

export function currentSession(requestHeaders) {
    const { sessionId } = getCookies(requestHeaders);
    return sessionId && getSession(sessionId);
}

export function logout(headers, sessionId) {
    deleteSession(sessionId);
    deleteCookie(headers, "sessionId", { path: "/" });
}