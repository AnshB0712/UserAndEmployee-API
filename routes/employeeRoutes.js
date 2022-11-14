const {
  getAllEmployees,
  addNewEmployee,
  editEmployeeDetails,
  deleteEmployeeDetails,
} = require("../controllers/employeeController");
const express = require("express");
const rolesVerifier = require("../middleware/rolesVerifier");
const ROLES_LIST = require("../config/roles_list");

const employeeRouter = express.Router();
employeeRouter
  .route("/")
  .get(getAllEmployees)
  .post(rolesVerifier(ROLES_LIST.Admin), addNewEmployee)
  .put(rolesVerifier(ROLES_LIST.Editor), editEmployeeDetails)
  .delete(rolesVerifier(ROLES_LIST.Admin), deleteEmployeeDetails);

module.exports = employeeRouter;
