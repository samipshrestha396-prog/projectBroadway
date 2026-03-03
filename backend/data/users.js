import bcrypt from "bcryptjs";

const users = [
  {
    name: "Samip",
    surename: "Shrestha",
    gmail: "samip@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    is_admin: true,
  },
  {
    name: "Binish",
    surename: "Shrestha",
    gmail: "binish@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    is_admin: false,
  },
  {
    name: "Sujan",
    surename: "Khadka",
    gmail: "sujan@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    is_admin: false,
  },
];

export default users;