import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { EXPENSES_SERVICE_URL } from "../../../base";
import {
  CalanderCount,
  CalendarEntry,
} from "../../../domain/modals/calander-count";
import { AxiosHttpClient } from "../../../infra/axios-http-client";
import { RemoteFetchCalendarCount } from "../../../data/usecases/remote-fetch-calander-count";
import { Endpoints } from "../../../domain/endpoints";
import { Constant } from "../../../constants/constants";
import dayjs, { Dayjs } from "dayjs";

interface FetchCalendarCountSliceInterface {
  fetchCalendarCount: Function;
  fetchCalendarCountLoading: boolean;
  calendarCountData: CalendarEntry[];
  selectedDate: Dayjs;
  setSelectedDate: Function;
  totalAmountSpentPerMonth: number;
}

const initialStates = {
  fetchCalendarCountLoading: false,
  calendarCountData: [],
  selectedDate: dayjs(new Date()),
  totalAmountSpentPerMonth: 0,
};

// const storage = LocalJsonStorage.getInstance();
const axiosHttpClient = AxiosHttpClient.getInstance();

export const useFetchCalendarCountSlice: StateCreator<
  FetchCalendarCountSliceInterface
> = (set, get) => ({
  ...initialStates,
  fetchCalendarCount: async (month_year: string) => {
    // const token = storage.get(PSP_AUTH_TOKEN_KEY);
    // axiosHttpClient.setAuthHeaders({ [AUTH_HEADER]: atob(token) });
    const remoteFetchCalendarCount = new RemoteFetchCalendarCount(
      `${EXPENSES_SERVICE_URL}${Endpoints.FETCH_APPOINTMENT_CALENDAR_COUNT}`,
      axiosHttpClient
    );

    const payload = {
      month_year,
    };

    set(() => ({ fetchCalendarCountLoading: true }));

    let result: CalanderCount = await remoteFetchCalendarCount.fetch(payload);

    if (result) {
      if (result.success) {
        const totalAmountSpent = result.resultArray.reduce((total, expense) => {
          return total + expense.totalAmount;
        }, 0);
        set(() => ({
          calendarCountData: result.resultArray,
          totalAmountSpentPerMonth: totalAmountSpent,
        }));
        set(() => ({ fetchCalendarCountLoading: false }));
      } else {
        Swal.fire("Fetching Calander count failed.", "", "error");
      }
    } else {
      Swal.fire(Constant.SOMETHING_WENT_WRONG, "", "error");
    }
  },
  setSelectedDate: (date: Dayjs) => {
    set(() => ({ selectedDate: date }));
  },
});
