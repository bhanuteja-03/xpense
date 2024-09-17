import { CreateExpenseResponse } from "../../domain/modals/create-expense";
import { CreateExpense } from "../../domain/usages/create-expense";
import { HttpConstants } from "../protocols/http/http-constants";
import { HttpPostClient } from "../protocols/http/http-post-client";

export class RemoteCreateExpense implements CreateExpense {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async create(params: CreateExpense.Params): Promise<CreateExpenseResponse> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      //   authHeaders: true,
    });

    return httpResponse.data;
  }
}
