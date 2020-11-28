import * as dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectURIs: process.env.OAUTH_REDIRECT_URIS?.split(","),
  },
  test: {
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectURIs: process.env.OAUTH_REDIRECT_URIS?.split(","),
  },
  production: {
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.DB_PASSWORD,
    redirectURIs: process.env.OAUTH_REDIRECT_URIS?.split(","),
  },
};

export default config;
