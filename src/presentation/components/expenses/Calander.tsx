import { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Constant } from "../../../constants/constants";
import { useExpensesStore } from "../../../store/main/expenses/expenseStore";
import { DatePicker } from "@mui/x-date-pickers";
import { ExpenseCategory } from "../../../constants/enums/ExpenseCategory";

interface ExpenseData {
  category: ExpenseCategory | "";
  amount: number | "";
  description: string;
  date: Dayjs | null;
}

export default function Calander() {
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    category: "",
    amount: "",
    description: "",
    date: dayjs(),
  });

  const {
    selectedDate,
    setSelectedDate,
    fetchCalendarCount,
    calendarCountData,
    fetchCalendarCountLoading,
    createExpense,
  } = useExpensesStore();

  const handleChange = (field: keyof ExpenseData, value: any) => {
    setExpenseData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const isFormValid = (): boolean => {
    const { category, amount, description, date } = expenseData;
    return (
      category !== "" && amount !== "" && description !== "" && date !== null
    );
  };

  const fetchDays = ({ signal }: { signal: AbortSignal }) => {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysToHighlight = calendarCountData.map((item) =>
          parseInt(item.date.split("-")[2])
        );

        resolve({ daysToHighlight });
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  };

  const fetchHighlightedDays = () => {
    const controller = new AbortController();
    fetchDays({
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        setHighlightedDays([]);
        setIsLoading(false);
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  const handleDayChange = (date: Dayjs) => {
    date && fetchHighlightedDays();
    setSelectedDate(date);
    console.log("Selected date:", date ? date.format("YYYY-MM-DD") : null);
    // Add logic for when a date is selected
  };

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    fetchCalendarCount(
      moment(date.toString()).format(Constant.YEAR_MONTH_FORMAT)
    );

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays();
  };

  useEffect(() => {
    fetchHighlightedDays();
    return () => requestAbortController.current?.abort();
  }, [calendarCountData]);

  useEffect(() => {
    fetchCalendarCount(
      moment(selectedDate.toString()).format(Constant.YEAR_MONTH_FORMAT)
    );
  }, []);

  const MonthCounts = (yearMonth: string) => {
    // Extract year and month from the prop
    const year = parseInt(yearMonth.slice(0, 4));
    const month = parseInt(yearMonth.slice(4));

    // Calculate the number of days in the given month
    const daysInMonth = new Date(year, month, 0).getDate();

    // Initialize counts for each day in the month
    const dailyCounts: number[] = Array(daysInMonth).fill(0);

    // Populate counts from the provided data
    calendarCountData.forEach((entry) => {
      const entryDate = new Date(
        moment(entry.date, Constant.YEAR_MONTH_DATE_FORMAT).format(
          Constant.YEAR_MONTH_DATE_FORMAT
        )
      );

      if (
        entryDate.getFullYear() === year &&
        entryDate.getMonth() + 1 === month
      ) {
        const dayOfMonth = entryDate.getDate();
        dailyCounts[dayOfMonth - 1] += entry.count;
      }
    });
    return dailyCounts;
  };

  const ServerDay = (
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <Box
              bgcolor="red"
              p={0.5}
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width={8}
              height={8}
            >
              <Typography
                variant="caption"
                fontWeight={660}
                color="white"
                textAlign="center"
                fontSize={"9px"}
              >
                {selectedDate &&
                  MonthCounts(
                    moment(selectedDate.toString()).format(
                      Constant.YEAR_MONTH_FORMAT
                    )
                  )[props.day.date() - 1]}
              </Typography>
            </Box>
          ) : undefined
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  return (
    <Stack direction={"column"} alignItems={"center"} p={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          loading={isLoading || fetchCalendarCountLoading}
          onChange={handleDayChange}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
        />
      </LocalizationProvider>
      <Stack direction="column" spacing={1.5} width="80%">
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            fullWidth
            label="Category"
            value={expenseData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            {Object.values(ExpenseCategory).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="Enter amount"
          label="Amount"
          value={expenseData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />

        <TextField
          fullWidth
          size="small"
          type="text"
          label="Description"
          value={expenseData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expense date"
            value={expenseData.date}
            disableFuture
            onChange={(newDate) => handleChange("date", newDate)}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          color="primary"
          disabled={!isFormValid()}
          onClick={() => {
            console.log(expenseData);
            createExpense(
              expenseData.category,
              expenseData.amount,
              expenseData.description,
              dayjs(expenseData.date).format(Constant.YEAR_MONTH_DATE_FORMAT)
            );
            setExpenseData({
              category: "",
              amount: "",
              description: "",
              date: dayjs(),
            });
          }}
        >
          Create Expense
        </Button>
      </Stack>
    </Stack>
  );
}
