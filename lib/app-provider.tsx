"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/store/StoreProvider";
import React from "react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </StoreProvider>
  );
};
