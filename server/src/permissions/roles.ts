export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export type Role = keyof typeof ROLES;

export function checkRoleValid(role: string) {
  return Object.keys(ROLES).includes(role);
}
