import jwt from "jsonwebtoken";
import { validateToken } from "../services/authentication.js";

export default function checkAuth(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    // If no token is found, stop execution and send a 401 response
    if (!tokenCookieValue) {
      res.locals.authMessage = "Please sign in to continue";
      return res.status(401).redirect("/user/signin");
    }

    try {
      // Validate the token and attach the user payload to the request
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      // If token validation fails, send a 401 response
      return res.status(401).redirect("/user/signin")
    }

    // Proceed to the next middleware or route handler
    console.log(req.user);
    next();
  };
}


