import { CalanderCount } from "../../domain/modals/calander-count";
import { FetchCalendarCount } from "../../domain/usages/calander-count";
import { HttpConstants } from "../protocols/http/http-constants";
import { HttpGetClient } from "../protocols/http/http-get-client";

export class RemoteFetchCalendarCount implements FetchCalendarCount {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async fetch(params: FetchCalendarCount.Params): Promise<CalanderCount> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      query: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      //   authHeaders: true,
    });

    return httpResponse.data;
  }
}
