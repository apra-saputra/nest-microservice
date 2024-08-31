type ResponsePayloadType = {
  message: string;
  constant: string;
  data?: any;
};

export type ResponseResultType = {
  message: string;
  status: string;
  data?: any;
};

export class Response {
  private static _instance: Response;

  // Make the constructor private to prevent direct instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static get instance(): Response {
    if (!this._instance) {
      this._instance = new Response();
    }
    return this._instance;
  }

  // Method to build a response
  public buildResponse(response: ResponsePayloadType): ResponseResultType {
    return {
      message: response.message,
      status: response.constant,
      data: response.data,
    };
  }
}
