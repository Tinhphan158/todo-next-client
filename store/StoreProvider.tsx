"use client";

import { useMemo } from "react";
import { Provider } from "react-redux";
import { AuthSessionHydrator } from "./AuthSessionHydrator";
import { makeStore } from ".";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), []);

  return (
    <Provider store={store}>
      <AuthSessionHydrator>{children}</AuthSessionHydrator>
    </Provider>
  );
}
