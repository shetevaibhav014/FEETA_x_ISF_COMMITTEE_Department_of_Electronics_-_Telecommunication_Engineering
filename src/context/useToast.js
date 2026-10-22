import { useContext } from "react";
import { ToastContext } from "./toastContextStore";

export function useToast() {
  return useContext(ToastContext);
}
