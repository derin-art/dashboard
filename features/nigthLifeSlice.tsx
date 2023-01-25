import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import coinGeckoChartData from "../mockData/coinGeckoChartData";

interface NightState {
  value: {
    isNight: boolean;
    coinData: number[][];
    res: any;
  };
}

const initialState: NightState = {
  value: {
    isNight: false,
    coinData: coinGeckoChartData,
    res: "",
  },
};

export const nigthSlice = createSlice({
  name: "Night",
  initialState,
  reducers: {
    change: (state) => {
      state.value.isNight = !state.value.isNight;
    },
    setGraphData: (state, action) => {
      state.value.coinData = action.payload;
    },
    setResponse: (state, action) => {
      state.value.res = action.payload;
    },
  },
});

export const { change, setGraphData, setResponse } = nigthSlice.actions;

export const NightSelector = (state: RootState) => state.night.value;

export default nigthSlice.reducer;
