export enum Role {
  Admin = "admin",
  User = "user",
  Guest = "guest",
  Anon = "anon",
}

export const permissionMap = {
  admin: ["edit-collection", "read-dashboard", "edit-dashboard"],
  user: ["edit-collection", "read-dashboard"],
  guest: ["edit-collection", "read-dashboard"],
  anon: ["read-collection"],
};
