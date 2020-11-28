import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { ErrorHandler } from "../ErrorHandler";

export default class PassportGoogle {
  /**
   * handlingToVerifyToken check if user logged in
   */
  public static handlingToVerifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    passport.authenticate("google-verify-token", (err, user, info) => {
      // si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
      if (info) {
        return next(new ErrorHandler(403, info.message));
      }

      // si hubo un error en la validación del dominio
      if (err) {
        console.error(`err: ${err}`);
        throw new ErrorHandler(err.statusCode, err.message);
      }

      req.user = user;
      next();
    })(req, res, next);
  }
}
