import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import nigthLifeReducer from "./features/nigthLifeSlice";

export const store = configureStore({
  reducer: {
    night: nigthLifeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
