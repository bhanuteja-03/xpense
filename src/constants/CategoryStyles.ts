import { ExpenseCategory } from "./enums/ExpenseCategory";

// Use Category enum as keys for the category styles
export const categoryStyles: Record<
  ExpenseCategory,
  { bgcolor: string; bordercolor: string }
> = {
  [ExpenseCategory.Fuel]: {
    bgcolor: "#FFF9C4", // Light Yellow
    bordercolor: "#FBC02D", // Darker Yellow
  },
  [ExpenseCategory.Food]: {
    bgcolor: "#C8E6C9", // Light Green
    bordercolor: "#388E3C", // Darker Green
  },
  [ExpenseCategory.Alcohol]: {
    bgcolor: "#F8BBD0", // Light Pink
    bordercolor: "#C2185B", // Darker Pink
  },
  [ExpenseCategory.House]: {
    bgcolor: "#BBDEFB", // Light Blue
    bordercolor: "#1976D2", // Darker Blue
  },
  [ExpenseCategory.Miscellaneous]: {
    bgcolor: "#E0E0E0", // Light Grey
    bordercolor: "#616161", // Darker Grey
  },
  [ExpenseCategory.Groceries]: {
    bgcolor: "#FFCCBC", // Light Orange
    bordercolor: "#E64A19", // Darker Orange
  },
};
