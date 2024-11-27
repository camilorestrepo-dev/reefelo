export class RaffleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RaffleError";
    Object.setPrototypeOf(this, RaffleError.prototype);
  }
}
