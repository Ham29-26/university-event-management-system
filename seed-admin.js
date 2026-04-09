import { createUser } from "./app/models/users.js";

// CREATING AN ADMIN USER
const adminUser = {
    username: "adminUsername",
    password: "Admin@123456",
    role: "admin"
};

await createUser(adminUser);

console.log("Admin user created successfully");
