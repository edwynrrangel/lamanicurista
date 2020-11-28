import { Application } from "express";

type Handler = (...[]) => Promise<any> | any;

interface Event {
  path: string;
  handler: Handler;
}

export class EventHandler {
  constructor(private events: Event[], private app: Application) {}

  public apply() {
    for (const event of this.events) {
      const { path, handler } = event;
      this.app.on(path, handler);
    }
  }
}
