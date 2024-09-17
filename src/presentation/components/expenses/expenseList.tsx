import { Stack, Typography } from "@mui/material";
import { useExpensesStore } from "../../../store/main/expenses/expenseStore";
import { useEffect } from "react";
import { Constant } from "../../../constants/constants";
import dayjs from "dayjs";
import { ExpenseCard } from "./expenseCard";
import { FetchState } from "../../../constants/enums/FetchState";
import ExpenseBarChart from "./ExpenseBarChart";

export const ExpenseList = () => {
  const { getExpenseList, getExpenseListLoading, expenseList, selectedDate } =
    useExpensesStore();

  useEffect(() => {
    getExpenseList(dayjs(selectedDate).format(Constant.YEAR_MONTH_DATE_FORMAT));
  }, [selectedDate, getExpenseList]);

  const calculateTotalExpense = () => {
    return expenseList.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <Stack direction={"column"} justifyContent={"space-between"}>
      <>
        <Typography fontSize={"32px"}>
          {dayjs(selectedDate).format(Constant.YEAR_MONTH_DATE_WORD_FORMAT)}
        </Typography>
        {getExpenseListLoading === FetchState.SUCCESS && (
          <Stack direction={"row"} flexWrap={"wrap"}>
            {expenseList &&
              expenseList.map((expense, index) => (
                <ExpenseCard
                  key={index}
                  category={expense.category}
                  description={expense.description}
                  amount={expense.amount}
                />
              ))}
          </Stack>
        )}
        <Typography fontSize={"32px"} fontWeight={600} textAlign={"right"}>
          {calculateTotalExpense()}
        </Typography>
      </>
      <ExpenseBarChart />
    </Stack>
  );
};
