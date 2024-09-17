import { create } from "zustand";
import { useFetchCalendarCountSlice } from "../../slices/expenses/fetchCalanderCountSlice";
import { useGetExpenseListSlice } from "../../slices/expenses/getExpenseListSlice";
import { useCreateExpenseSlice } from "../../slices/expenses/createExpenseListSlice";

interface ExpensesStoreInterface
  extends ReturnType<typeof useFetchCalendarCountSlice>,
    ReturnType<typeof useGetExpenseListSlice>,
    ReturnType<typeof useCreateExpenseSlice> {}

export const useExpensesStore = create<ExpensesStoreInterface>()(
  (...expense) => ({
    ...useFetchCalendarCountSlice(...expense),
    ...useGetExpenseListSlice(...expense),
    ...useCreateExpenseSlice(...expense),
  })
);
