import { Expense } from "./create-expense";

export type ExpenseListResponse = {
  success: boolean;
  expenses: Expense[];
};
