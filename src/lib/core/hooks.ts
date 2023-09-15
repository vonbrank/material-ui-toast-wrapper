import { useContext } from "react";
import { toastContext } from "./ToastProvider";

export const useToast = () => {
  const toastContextInstance = useContext(toastContext);
  return { showTemporaryText: toastContextInstance.showTemporaryText };
};
