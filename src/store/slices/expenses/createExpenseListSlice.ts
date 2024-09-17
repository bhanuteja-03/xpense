import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { EXPENSES_SERVICE_URL } from "../../../base";
import { AxiosHttpClient } from "../../../infra/axios-http-client";
import { Endpoints } from "../../../domain/endpoints";
import { Constant } from "../../../constants/constants";
import { FetchState } from "../../../constants/enums/FetchState";
import { RemoteCreateExpense } from "../../../data/usecases/remote-create-expense";
import { CreateExpenseResponse } from "../../../domain/modals/create-expense";
import { ExpenseCategory } from "../../../constants/enums/ExpenseCategory";
import { useExpensesStore } from "../../main/expenses/expenseStore";
import moment from "moment";

interface createExpenseSliceInterface {
  createExpense: Function;
  createExpenseLoading: FetchState;
}

const initialStates = {
  createExpenseLoading: FetchState.DEFAULT,
};

// const storage = LocalJsonStorage.getInstance();
const axiosHttpClient = AxiosHttpClient.getInstance();

export const useCreateExpenseSlice: StateCreator<
  createExpenseSliceInterface
> = (set, get) => ({
  ...initialStates,
  createExpense: async (
    category: ExpenseCategory,
    amount: number,
    description: string,
    date: string
  ) => {
    // const token = storage.get(PSP_AUTH_TOKEN_KEY);
    // axiosHttpClient.setAuthHeaders({ [AUTH_HEADER]: atob(token) });
    const remoteCreateExpense = new RemoteCreateExpense(
      `${EXPENSES_SERVICE_URL}${Endpoints.GET_EXPENSE_LIST}`,
      axiosHttpClient
    );

    Swal.fire("Loading Response...", "");

    const payload = {
      date,
      category,
      amount,
      description,
    };

    set(() => ({ createExpenseLoading: FetchState.LOADING }));

    let result: CreateExpenseResponse = await remoteCreateExpense.create(
      payload
    );

    if (result) {
      if (result.success) {
        set(() => ({ createExpenseLoading: FetchState.SUCCESS }));
        Swal.fire(result.message, "", "success");
        useExpensesStore
          .getState()
          .fetchCalendarCount(moment(date).format(Constant.YEAR_MONTH_FORMAT));
        useExpensesStore.getState().getExpenseList(date);
      } else {
        Swal.fire(result.message, "", "error");
        set(() => ({ createExpenseLoading: FetchState.ERROR }));
      }
    } else {
      Swal.fire(Constant.SOMETHING_WENT_WRONG, "", "error");
      set(() => ({ createExpenseLoading: FetchState.ERROR }));
    }
  },
});
