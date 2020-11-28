export class ErrorHandler extends Error {
  constructor(public statusCode: number, public message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    if (process.env.NODE_ENV === "development") {
      console.error(this.message);
    }
  }
}
