import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import coinGeckoChartData from "../mockData/coinGeckoChartData";
import parseJson from "parse-json";

interface NightState {
  value: {
    isNight: boolean;
    coinData: number[][];
    res: any;
    coinId: string;
    duration: string;
  };
}

let PrevCoinData;
let PrevCoinDuration;

if (typeof window !== "undefined") {
  const something = window.localStorage.getItem("PrevCoinData");

  if (something) {
    const localStorageCoinData = parseJson(something);

    if (localStorageCoinData.data) {
      PrevCoinData = localStorageCoinData.data;
    }
    if (localStorageCoinData.coinDuration) {
      PrevCoinDuration = localStorageCoinData.coinDuration;
    }
  }
}

const initialState: NightState = {
  value: {
    isNight: true,
    coinData: PrevCoinData ? PrevCoinData : coinGeckoChartData,
    res: "",
    coinId: "bitcoin",
    duration: PrevCoinDuration ? PrevCoinDuration : "1",
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
    setCoinId: (state, action) => {
      state.value.coinId = action.payload;
    },
    setDuration: (state, action) => {
      state.value.duration = action.payload;
    },
  },
});

export const { change, setGraphData, setResponse, setCoinId, setDuration } =
  nigthSlice.actions;

export const NightSelector = (state: RootState) => state.night.value;

export default nigthSlice.reducer;
