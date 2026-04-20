import { createUser } from "./app/models/users.js";

// CREATING AN ADMIN USER
const adminUser = {
    username: "adminUsername",
    password: "admin1234567",
    name: "Admin User",
    email: "admin@university.com",
    role: "admin"
};

await createUser(adminUser);

console.log("Admin user created successfully");
