export class Handler {
  static send(payload) {
    return {
      type: "Send request",
      payload: `Customer need ${payload}`,
    };
  }
  static receive(payload) {
    return {
      type: "Receive request",
      payload: `Customer need ${payload}`,
    };
  }
  static sign(payload) {
    return {
      type: "Sign request",
      payload: `Customer need ${payload}`,
    };
  }
}
