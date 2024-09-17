import { HttpConstants } from "./http-constants";

export interface HttpDeleteClient {
  delete: (params: HttpDeleteClient.Params) => Promise<any>;
}

export namespace HttpDeleteClient {
  export type Params = {
    url: string;
    body?: any;
    headers?: {
      [key: string]: string;
    };
    authHeaders?: boolean;
    responseType?: HttpConstants.RESPONSE_TYPES;
  };
}
