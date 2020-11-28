import parser from "body-parser";
import cors from "cors";
import { Application } from "express";
import morgan from "morgan";
import passport from "passport";

export const handleCors = (app: Application) =>
  app.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (app: Application) => {
  app.use(parser.urlencoded({ extended: false }));
  app.use(parser.json());
};

export const handleMorgan = (app: Application) => {
  app.use(morgan("dev"));
};

export const handlePassportInit = (app: Application) => {
  app.use(passport.initialize());
};

export default [
  handleCors,
  handleBodyRequestParsing,
  handleMorgan,
  handlePassportInit,
];
