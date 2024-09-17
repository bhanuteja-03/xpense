import { ExpenseCategory } from "../../constants/enums/ExpenseCategory";
import { CreateExpenseResponse } from "../modals/create-expense";

export interface CreateExpense {
  create(params: CreateExpense.Params): Promise<CreateExpenseResponse>;
}

export namespace CreateExpense {
  export type Params = {
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
  };
}
