import { Application } from "express";

type Wrapper = (app: Application) => void;

export class CommonHandler {
  constructor(private middleware: Wrapper[], private app: Application) {}

  public apply() {
    for (const f of this.middleware) {
      f(this.app);
    }
  }
}
