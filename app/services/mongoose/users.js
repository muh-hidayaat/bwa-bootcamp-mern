const User = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password != confirmPassword) {
    throw new BadRequestError("Konfirmasi password salah");
  }

  const result = await Organizers.create({ organizer });

  const users = await User.create({
    email,
    name,
    password,
    organizer: result._id,
    role,
  });

  delete users._doc.password;

  return users;
};

module.exports = { createOrganizer };
