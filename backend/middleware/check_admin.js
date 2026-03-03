const check_admin = (req, res, next) => {
  if (!req.user.is_admin) {
   return res.status(403).send({ error: "you are not authorize to access this feature!" });
  }
  next();
};

export default check_admin;
