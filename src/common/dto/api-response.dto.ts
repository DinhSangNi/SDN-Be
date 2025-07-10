export class ApiResponse<T> {
  message?: string;
  data?: T;

  constructor(message?: string, data?: T) {
    this.data = data;
    if (message) this.message = message;
  }
}
