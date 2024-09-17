import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { EXPENSES_SERVICE_URL } from "../../../base";
import { AxiosHttpClient } from "../../../infra/axios-http-client";
import { Endpoints } from "../../../domain/endpoints";
import { Constant } from "../../../constants/constants";
import { ExpenseListResponse } from "../../../domain/modals/expense-list-response";
import { RemoteGetExpenseList } from "../../../data/usecases/remote-get-expense-list";
import { FetchState } from "../../../constants/enums/FetchState";
import { Expense } from "../../../domain/modals/create-expense";

interface getExpenseListSliceInterface {
  getExpenseList: Function;
  getExpenseListLoading: FetchState;
  expenseList: Expense[];
}

const initialStates = {
  getExpenseListLoading: FetchState.DEFAULT,
  expenseList: [],
};

// const storage = LocalJsonStorage.getInstance();
const axiosHttpClient = AxiosHttpClient.getInstance();

export const useGetExpenseListSlice: StateCreator<
  getExpenseListSliceInterface
> = (set, get) => ({
  ...initialStates,
  getExpenseList: async (date?: string) => {
    // const token = storage.get(PSP_AUTH_TOKEN_KEY);
    // axiosHttpClient.setAuthHeaders({ [AUTH_HEADER]: atob(token) });
    const remotegetExpenseList = new RemoteGetExpenseList(
      `${EXPENSES_SERVICE_URL}${Endpoints.GET_EXPENSE_LIST}`,
      axiosHttpClient
    );

    const payload = {
      date: date,
    };

    set(() => ({ getExpenseListLoading: FetchState.LOADING }));

    let result: ExpenseListResponse = await remotegetExpenseList.get(payload);

    if (result) {
      if (result.success) {
        set(() => ({ expenseList: result.expenses }));
        set(() => ({ getExpenseListLoading: FetchState.SUCCESS }));
      } else {
        Swal.fire("Fetching Expense List failed.", "", "error");
        set(() => ({ getExpenseListLoading: FetchState.ERROR }));
      }
    } else {
      Swal.fire(Constant.SOMETHING_WENT_WRONG, "", "error");
      set(() => ({ getExpenseListLoading: FetchState.ERROR }));
    }
  },
});
