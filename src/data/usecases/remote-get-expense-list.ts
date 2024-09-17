import { ExpenseListResponse } from "../../domain/modals/expense-list-response";
import { GetExpenseList } from "../../domain/usages/expense-list";
import { HttpConstants } from "../protocols/http/http-constants";
import { HttpGetClient } from "../protocols/http/http-get-client";

export class RemoteGetExpenseList implements GetExpenseList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(params: GetExpenseList.Params): Promise<ExpenseListResponse> {
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
