import {
  GenerateAuthUrlOpts,
  LoginTicket,
  OAuth2Client,
} from "google-auth-library";
import {
  GetTokenResponse,
  VerifyIdTokenOptions,
} from "google-auth-library/build/src/auth/oauth2client";

import config from "../../config/google";

export class OauthGoogle {
  /**
   * connect
   */
  public static init() {
    const { clientID, clientSecret, redirectURIs } = config[
      process.env.NODE_ENV || "development"
    ];
    if (!OauthGoogle.instance) {
      OauthGoogle.instance = new OAuth2Client(
        clientID,
        clientSecret,
        redirectURIs
      );
    }

    return OauthGoogle.instance;
  }

  /**
   * generate Auth Url
   */
  public static generateAuthUrl(options: GenerateAuthUrlOpts): string {
    return OauthGoogle.instance.generateAuthUrl(options);
  }

  public static getToken(code: string): Promise<GetTokenResponse> {
    return OauthGoogle.instance.getToken(code);
  }

  /**
   * Verify Id Token
   */
  public static verifyIdToken(
    options: VerifyIdTokenOptions
  ): Promise<LoginTicket> {
    return OauthGoogle.instance.verifyIdToken(options);
  }

  /**
   * Revoke Credentials
   */
  public static revokeCredentials() {
    OauthGoogle.instance.revokeCredentials();
  }

  private static instance: OAuth2Client;

  private constructor() {}
}
