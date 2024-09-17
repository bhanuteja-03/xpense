export type CalendarEntry = {
  date: string;
  count: number;
  totalAmount: number;
};

export type CalanderCount = {
  success: boolean;
  resultArray: CalendarEntry[];
};
