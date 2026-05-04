"use client";
import { useCallback, useState } from "react";

interface UseDialogReturn {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggleDialog: () => void;
  setDialog: (open: boolean) => void;
}

export const useDialog = (initialOpen: boolean = false): UseDialogReturn => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDialog = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
    setDialog: setIsOpen,
  };
};
