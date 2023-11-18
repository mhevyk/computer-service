export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export type Role = keyof typeof ROLES;

export function checkRoleValid(role: string) {
  return Object.keys(ROLES).includes(role);
}
