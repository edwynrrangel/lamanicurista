type Wrapper = () => void;

export class PassportHandler {
  constructor(private middleware: Wrapper[]) {}

  public apply() {
    for (const f of this.middleware) {
      f();
    }
  }
}
