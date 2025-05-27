import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

const studentAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorised access" });
  }

  const jwtToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(jwtToken, config.JWT_SECRET);
    if (decoded.type !== "student") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.student = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default studentAuthMiddleware;
