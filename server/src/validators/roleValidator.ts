import { body } from "express-validator";
import { ROLES, checkRoleValid } from "../permissions/roles";

export default body("role", "Такої ролі не існує")
  .default(ROLES.USER)
  .custom(role => checkRoleValid(role));
