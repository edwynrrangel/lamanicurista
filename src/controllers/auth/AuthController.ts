import { NextFunction, Request, Response } from "express";

import { OauthGoogle } from "../../lib/google/OauthGoogle";
import { ErrorHandler } from "../../lib/ErrorHandler";

export class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { code } = req.body;
    if (code) {
      try {
        const { tokens } = await OauthGoogle.getToken(code);
        return res.json({ data: { tokens } });
      } catch (error) {
        console.error(error);
      }
    } else {
      return next(new ErrorHandler(403, "Credenciales no validas!"));
    }
  }
}
