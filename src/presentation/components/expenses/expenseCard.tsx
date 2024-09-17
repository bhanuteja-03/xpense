import { Stack, Typography } from "@mui/material";
import { categoryStyles } from "../../../constants/CategoryStyles";
import { ExpenseCategory } from "../../../constants/enums/ExpenseCategory";
import { motion } from "framer-motion";

interface ExpenseCardInterface {
  category: ExpenseCategory;
  description?: string;
  amount: number;
}

export const ExpenseCard: React.FC<ExpenseCardInterface> = ({
  category,
  description,
  amount,
}) => {
  const styles =
    categoryStyles[category] || categoryStyles[ExpenseCategory.Miscellaneous];

  return (
    <motion.div whileHover={{ scale: 1.2 }}>
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"250px"}
        height={"50px"}
        bgcolor={styles.bgcolor}
        borderRadius={"5px"}
        p={1}
        borderLeft={`3px solid ${styles.bordercolor}`}
        mr={1}
        mb={1}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography>{category}</Typography>
          <Typography fontWeight={"600"}>{amount}</Typography>
        </Stack>
        <Typography alignSelf={"flex-start"}>{description}</Typography>
      </Stack>
    </motion.div>
  );
};
