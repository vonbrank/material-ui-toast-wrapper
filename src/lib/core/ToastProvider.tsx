import React, { useState, createContext } from "react";
import { AlertColor } from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";
import { AlertBase, Toast } from "./Toast";
import { delay } from "../utils";

interface ToastContext {
  addAlert: (newAlert: AlertBase) => void;
  removeAlertById: (id: string) => void;
  showTemporaryText: (
    alert: { severity?: AlertColor; message: string },
    autoHideDuration?: number
  ) => void;
}

interface ToastProviderProps {
  children?: React.ReactNode;
}

export const toastContext = createContext<ToastContext>({
  addAlert(newAlert) {},
  removeAlertById(id) {},
  showTemporaryText(alert, autoHideDuration) {},
});

export const ToastProvider = (props: ToastProviderProps) => {
  const { children } = props;
  const [alertList, setAlertList] = useState<AlertBase[]>([]);
  const addAlert = (newAlert: AlertBase) => {
    setAlertList((current) => [newAlert, ...current]);
  };
  const removeAlertById = (id: string) => {
    setAlertList((current) => current.filter((alert) => alert.alertId !== id));
  };
  const showTemporaryText = async (
    alert: { severity?: AlertColor; message: string },
    autoHideDuration = 5000
  ) => {
    const alertId = uuidv4();
    console.log(`showTemporaryText: alertId = ${alertId}`);
    addAlert({ ...alert, alertId: alertId });
    if (autoHideDuration > 0) {
      await delay(autoHideDuration);
      removeAlertById(alertId);
    }
  };
  return (
    <toastContext.Provider
      value={{ addAlert, removeAlertById, showTemporaryText }}
    >
      {children}
      <Toast alertList={alertList} removeAlertById={removeAlertById} />
    </toastContext.Provider>
  );
};
