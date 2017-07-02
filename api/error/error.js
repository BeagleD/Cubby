class Error {
  constructor(raw) {
    const { status, type, createdAt, message, data } = raw;

    this.status = status;
    this.type = type;
    this.createdAt = createdAt;
    this.message = message;
    this.data = data;
  }

  send() {
    const { status, type, message } = this;

    return {
      status,
      type,
      message,
    };
  }
}

export default Error;
