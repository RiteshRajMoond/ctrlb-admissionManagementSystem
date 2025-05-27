import jwt from "jsonwebtoken";

import { config } from "../config/index.js";

const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, token is missing or invalid" });
  }

  const jwtToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(jwtToken, config.JWT_SECRET);

    if (decoded.type !== "admin") {
      return res.status(403).json({ message: "Forbidden access" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default adminAuthMiddleware;
