import history from "connect-history-api-fallback";
import express, { Application } from "express";
import { join } from "path";

export const handleStatic = (app: Application, dirname: string = "") => {
  app.use(history());
  app.use(express.static(join(dirname, "/public")));
};

export default [handleStatic];
