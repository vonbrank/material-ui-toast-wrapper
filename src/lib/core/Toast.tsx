import React, { useState, useEffect } from "react";
import {
  Snackbar,
  Box,
  Alert,
  Collapse,
  List,
  useMediaQuery,
} from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import { TransitionGroup } from "react-transition-group";
import styles from "./Toast.module.css";

export interface AlertBase {
  severity?: AlertColor;
  message: string;
  alertId: string;
}

export interface ToastProps {
  alertList: AlertBase[];
  removeAlertById: (id: string) => void;
  timeout?: number;
}

export const Toast = (props: ToastProps) => {
  const { alertList, removeAlertById, timeout } = props;

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (alertList.length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [alertList]);

  const minWidth600 = useMediaQuery("(min-width:600px)");

  return (
    <Snackbar open={true} className={`${styles["Toast-root"]}`}>
      <Box sx={{ mt: 1, width: minWidth600 ? "36rem" : "100%" }}>
        <List>
          <TransitionGroup>
            {alertList.map((alert) => (
              <Collapse key={alert.alertId} timeout={timeout}>
                <Alert
                  severity={alert.severity}
                  sx={{ width: "100%", marginY: "0.2rem" }}
                  onClose={() => removeAlertById(alert.alertId)}
                >
                  {alert.message}
                </Alert>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </Snackbar>
  );
};
