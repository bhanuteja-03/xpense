import { Stack, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Stack
      height={"70px"}
      direction={"row"}
      alignItems={"center"}
      pl={3}
      pr={3}
      borderBottom={"1px solid grey"}
    >
      <Typography fontSize={"36px"}>Xpense</Typography>
    </Stack>
  );
};
