export abstract class ApiResponse<T> {}

export class ResponseSuccess<T> extends ApiResponse<T> {
  value: T;

  constructor(value: T) {
    super();
    this.value = value;
  }
}

export class ResponseFailure<T> extends ApiResponse<T> {
  error: T;

  constructor(error: T) {
    super();
    this.error = error;
  }
}
