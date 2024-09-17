import { ExpenseCategory } from "../../constants/enums/ExpenseCategory";

export type Expense = {
  _id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
};

export type CreateExpenseResponse = {
  success: boolean;
  message: string;
  expenses: Expense[];
};
