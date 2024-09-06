import { useContext } from "react";
import { IntContext } from "@/context/IntContext";

export const useInt = () => {
  const context = useContext(IntContext);

  if (!context) throw new Error("useInt must be used within a IntProvider");

  return context;
};