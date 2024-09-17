import { Box, Grid2, Stack } from "@mui/material";
import { Header } from "../components/header";
import Calander from "../components/expenses/Calander";
import { ExpenseList } from "../components/expenses/expenseList";

export const ExpensePage = () => {
  return (
    <Box
    // sx={{
    //   position: "fixed",
    //   height: "100vh",
    //   width: "100vw",
    //   top: 0,
    //   zIndex: -1,
    //   pointerEvents: "none",
    //   backgroundImage: `
    //   linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
    //   linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)
    // `,
    //   backgroundSize: "45px 45px",
    //   maskImage: "linear-gradient(0deg, transparent 40%, white)",
    // }}
    >
      <Header />
      <Stack direction={"row"} spacing={2} height={"90vh"}>
        <Stack width={"30%"}>
          <Calander />
        </Stack>
        <Stack width={"70%"} p={2}>
          <ExpenseList />
        </Stack>
      </Stack>
    </Box>
  );
};
