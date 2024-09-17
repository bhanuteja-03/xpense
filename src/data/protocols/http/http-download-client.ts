import { HttpConstants } from "./http-constants";

export interface HttpDownloadClient {
  download: (params: HttpDownloadClient.Params) => Promise<any>;
}

export namespace HttpDownloadClient {
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
