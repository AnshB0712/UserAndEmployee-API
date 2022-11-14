const Employee = require("../models/Employee");

const getAllEmployees = async (req, res) => {
  const result = await Employee.find();
  res.json(result);
};

const addNewEmployee = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname)
    res.status(401).send("Firstname and Lastname both are mandadtory fields.");

  await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  res.status(201).json({
    status: 201,
    message: "Employee is created!",
  });
};

const editEmployeeDetails = async (req, res) => {
  const { name, firstname, lastname } = req.body;

  if (firstname)
    await Employee.findOneAndUpdate({ firstname: name }, { firstname });

  if (lastname)
    await Employee.findOneAndUpdate({ firstname: name }, { lastname });

  res.json({
    status: 300,
    message: "Edits are made!",
  });
};

const deleteEmployeeDetails = async (req, res) => {
  const { name } = req.body;

  await Employee.findOneAndDelete({ firstname: name });

  res.json({
    status: 300,
    message: "Delete is made!",
  });
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  editEmployeeDetails,
  deleteEmployeeDetails,
};
