const rolesVerifier = (...roles) => {
  return (req, res, next) => {
    const rolesAssignedTo = req.roles;
    const rolesRequired = roles;

    const match = rolesRequired
      .map((role) => rolesAssignedTo.includes(role))
      .every((role) => role === true);

    if (!match) return res.sendStatus(403);

    next();
  };
};

module.exports = rolesVerifier;
