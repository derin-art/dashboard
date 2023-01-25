import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NightState {
  value: {
    isNight: boolean;
  };
}

const initialState: NightState = {
  value: {
    isNight: false,
  },
};

export const nigthSlice = createSlice({
  name: "Night",
  initialState,
  reducers: {
    change: (state) => {
      state.value.isNight = !state.value.isNight;
    },
  },
});

export const { change } = nigthSlice.actions;

export const NightSelector = (state: RootState) => state.night.value;

export default nigthSlice.reducer;
