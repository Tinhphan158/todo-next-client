import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.hydrated = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setHydrated, logout } = authSlice.actions;
export default authSlice.reducer;
