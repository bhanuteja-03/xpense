import { ExpenseListResponse } from "../modals/expense-list-response";

export interface GetExpenseList {
  get(params: GetExpenseList.Params): Promise<ExpenseListResponse>;
}

export namespace GetExpenseList {
  export type Params = {
    date?: string;
  };
}
