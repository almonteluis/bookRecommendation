import { useState, useCallback } from "react";
import { type ToastType } from "../components/Toast";

export type ToastState = {
  message: string;
  type: ToastType;
  isVisible: boolean;
  id: string;
};

export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now().toString();
    setToast({
      message,
      type,
      isVisible: true,
      id,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => (prev ? { ...prev, isVisible: false } : null));
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  // Convenience methods
  const showSuccess = useCallback(
    (message: string) => {
      showToast(message, "success");
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string) => {
      showToast(message, "error");
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string) => {
      showToast(message, "info");
    },
    [showToast]
  );

  return {
    toast,
    showToast,
    hideToast,
    clearToast,
    showSuccess,
    showError,
    showInfo,
  };
};
