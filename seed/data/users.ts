// seed/data/users.ts — admin user fixture

const USERS = [
  {
    email: "admin@simal.com",
    password: "SimalAdmin123!",
    firstName: "Admin",
    lastName: "User",
    role: "administrator",
    active: true,
  },
  {
    email: "admin@admin.com",
    password: "Admin@123",
    firstName: "Admin",
    lastName: "Admin",
    role: "administrator",
    active: true,
  },
];

export default USERS;
