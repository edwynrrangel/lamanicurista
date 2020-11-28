import * as dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  host: process.env.HOST,
};

export default config;
