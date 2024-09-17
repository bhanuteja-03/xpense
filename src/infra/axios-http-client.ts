import axios, { AxiosError } from "axios";
import { HttpPostClient } from "../data/protocols/http/http-post-client";
import { HttpGetClient } from "../data/protocols/http/http-get-client";
import { HttpPutClient } from "../data/protocols/http/http-put-client";
import { HttpAuthHeader } from "../data/protocols/http/http-auth-header";
import { HttpDownloadClient } from "../data/protocols/http/http-download-client";
import { HttpDeleteClient } from "../data/protocols/http/http-delete-client";

export class AxiosHttpClient
  implements
    HttpPostClient,
    HttpGetClient,
    HttpPutClient,
    HttpAuthHeader,
    HttpDownloadClient
{
  private static instance: AxiosHttpClient;
  private _authHeaders: { [key: string]: string } = {};

  /**
   * Singleton class private contructor
   */
  private constructor() {}

  /**
   * Singleton class create instance
   */
  public static getInstance(): AxiosHttpClient {
    if (!AxiosHttpClient.instance) {
      AxiosHttpClient.instance = new AxiosHttpClient();
    }
    return AxiosHttpClient.instance;
  }

  /**
   * Auth headers
   *
   * @param headers
   */
  setAuthHeaders(headers: { [key: string]: string }) {
    this._authHeaders = headers;
    return this;
  }

  /**
   * Post request
   * @param params
   * @returns
   */
  async post(params: HttpPostClient.Params): Promise<any> {
    try {
      return await axios.post(params.url, params.body, {
        headers: params.authHeaders
          ? this.prepareAuthHeader(params.headers)
          : params.headers,
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return err.response;
      }
      return null;
    }
  }

  async download(params: HttpDownloadClient.Params): Promise<any> {
    try {
      return await axios.post(params.url, params.body, {
        headers: params.authHeaders
          ? this.prepareAuthHeader(params.headers)
          : params.headers,

        responseType: "blob",
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return err.response;
      }
      return null;
    }
  }

  async put(params: HttpPutClient.Params): Promise<any> {
    try {
      return await axios.put(params.url, params.body, {
        headers: params.authHeaders
          ? this.prepareAuthHeader(params.headers)
          : params.headers,
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return err.response;
      }
    }
  }

  async get(params: HttpGetClient.Params): Promise<any> {
    try {
      return await axios.get(params.url, {
        params: params.query,
        headers: params.authHeaders
          ? this.prepareAuthHeader(params.headers)
          : params.headers,
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return err.response;
      }
    }
  }

  async delete(params: HttpDeleteClient.Params): Promise<any> {
    try {
      return await axios.delete(params.url, {
        params: params,
        headers: params.authHeaders
          ? this.prepareAuthHeader(params.headers)
          : params.headers,
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return err.response;
      }
    }
  }

  /**
   * Prepare auth headers
   *
   * @param headers
   * @returns
   */
  prepareAuthHeader(headers?: { [key: string]: string }) {
    if (headers && this._authHeaders)
      headers = { ...headers, ...this._authHeaders };
    return headers;
  }
}
