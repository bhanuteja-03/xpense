import { CalanderCount } from "../modals/calander-count";

export interface FetchCalendarCount {
  fetch(params: FetchCalendarCount.Params): Promise<CalanderCount>;
}
export namespace FetchCalendarCount {
  export type Params = {
    month_year: string;
  };
}
