import { TokenPayload } from "google-auth-library";
import passport from "passport";
import { GoogleTokenStrategy } from "passport-google-verify-token/lib/strategy";

import config from "../config/google";

export const middlewareGoogleStrategy = () => {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config[process.env.NODE_ENV || "development"].clientID,
      },
      (parsedToken: TokenPayload, googleId: string, done) => {
        if (parsedToken?.hd?.toLocaleLowerCase() !== "mobilenik.com") {
          return done(
            {
              statusCode: 401,
              message: "Solo se permite usuarios del dominio mobilenik.com.",
            },
            false
          );
        }
        return done(null, parsedToken);
      }
    )
  );
};

export default [middlewareGoogleStrategy];
