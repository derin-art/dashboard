import { Inter } from "@next/font/google";
import recentTrans from "../mockData/recentTrans";
import ChartView from "../components/ChartView";
import styles from "../styles/Home.module.css";
import coinGeckoChartData from "../mockData/coinGeckoChartData";
import { PropagateLoader, BounceLoader } from "react-spinners";
import {
  change,
  setGraphData,
  setResponse,
  setDuration,
} from "../features/nigthLifeSlice";
import axios from "axios";
import parseJson from "parse-json";
import { useAppSelector, useAppDispatch } from "../hooks/useDispatch";
import { ToastContainer, toast } from "react-toastify";
import RecentTrans from "../components/RecentTrans";
import DashDisplay from "../components/DashDisplay";
import chartData from "../mockData/chartData";
import { useEffect, useState, useRef } from "react";
import { type } from "os";
import "react-toastify/dist/ReactToastify.css";
import DebitCards from "../components/DebitCards";

const inter = Inter({ subsets: ["latin"] });

export type dataArray = {
  time_period_start: Date;
  time_period_end: Date;
  time_open: Date;
  time_close: Date;
  rate_open: number;
  rate_high: number;
  rate_low: number;
  rate_close: number;
}[];

export type coinGeckoArr = number[][];

export default function Home() {
  const toastId: any = useRef(null);
  const NightState = useAppSelector((state) => state.night.value.isNight);
  const CoinIdRedux = useAppSelector((state) => state.night.value.coinId);
  const ReduxDurationState = useAppSelector(
    (state) => state.night.value.duration
  );

  const customId = "custom-id-yes";
  const [coinData, setCoinData] = useState({
    data: [...coinGeckoChartData],
    res: {},
    prevData: [...coinGeckoChartData],
  });
  const [clickedSetRange, setClickedSetRange] = useState(false);
  const [searchTextMain, setSearchTextMain] = useState("");
  const [coinSearchRes, setCoinSearchRes] = useState({
    data: [],
    res: {},
  });
  const [searchName, setSearchName] = useState("");
  const [timeFrame, setTimeFrame] = useState("1");
  const [coinId, setCoinId] = useState("bitcoin");

  const timeFrameFunc = (val: string) => {
    console.log(val, "clicked");
    setTimeFrame(val);
  };

  console.log("main", coinData);

  const dispatch = useAppDispatch();

  const reduxDurationDuration = (duration: string) => {
    dispatch(setDuration(duration));
  };

  const fecthCurrentData = async () => {
    let prevCoinId = "bitcoin";
    if (typeof window !== "undefined") {
      const something = window.localStorage.getItem("PrevCoinData");

      if (something) {
        const localStorageCoinData = parseJson(something);
        console.log(localStorageCoinData, "ss");
        if (localStorageCoinData.coinId) {
          prevCoinId = localStorageCoinData.coinId;
        }
      }
    }
    console.log("prevCOinf", prevCoinId);
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${prevCoinId}/ohlc?vs_currency=usd&days=${ReduxDurationState}`
      )
      .then((data) => {
        if (data) {
          console.log(data.data);
          dispatch(setGraphData(data.data));
          dispatch(setResponse(data.status));
          const localStorageData = {
            data: data.data,
            coindId: CoinIdRedux,
            coinDuration: ReduxDurationState,
          };
          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "PrevCoinData",
              JSON.stringify(localStorageData)
            );
          }
        }
      })
      .catch((err) => {
        if (!toast.isActive(toastId.current)) {
          toast.info("Fetch Error, Graph Populated with previous Data", {
            className: "text-xs",
            toastId: customId,
          });
        }
        console.log(err);
        return;
      });
  };

  useEffect(() => {
    fecthCurrentData();
  }, []);

  const fecthDataonCoinSelect = async (id: string = coinId) => {
    console.log("You've got mail", id, ReduxDurationState);
    setCoinData((prev) => ({ ...prev, data: [] }));

    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${ReduxDurationState}`
      )
      .then((data) => {
        console.log(data);
        console.log(data.data);
        if (data.data.length === 0) {
          console.log("sent");
          toast.info(
            "No data available for this coin for selected date range 😓",
            {
              className: "text-xs",
              toastId: customId,
              theme: NightState ? "dark" : "light",
            }
          );
        }
        if (data) {
          dispatch(setGraphData(data.data));
          dispatch(setResponse(data.status));
          const localStorageData = {
            data: data.data,
            coindId: CoinIdRedux,
            coinDuration: ReduxDurationState,
          };
          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "PrevCoinData",
              JSON.stringify(localStorageData)
            );
          }

          setCoinData((prev) => ({ ...prev, data: data.data }));
        }
      })
      .catch((err) => {
        console.log(err);
        if (!toast.isActive(toastId.current)) {
          toast.error("Search Error, Please check your internet connection", {
            className: "text-xs",
            toastId: customId,
          });
        }
        return;
      });
  };

  const fecthDataonDateSelect = async (time: string = ReduxDurationState) => {
    setCoinData((prev) => ({ ...prev, data: [] }));
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${time}`
      )
      .then((data) => {
        console.log("red", data);
        console.log(data.data);
        if (data) {
          if (data.data.length === 0) {
            toast.info(
              "No data avialable for this coin for selected date range 😓",
              {
                className: "text-xs",
                toastId: customId,
                theme: NightState ? "dark" : "light",
              }
            );
          }
          dispatch(setGraphData(data.data));
          dispatch(setResponse(data.status));
          setCoinData((prev) => ({ ...prev, data: data.data }));
          const localStorageData = {
            data: data.data,
            coindId: CoinIdRedux,
            coinDuration: ReduxDurationState,
          };
          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "PrevCoinData",
              JSON.stringify(localStorageData)
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
        if (!toast.isActive(toastId.current)) {
          toast.error("Search Error, Please check your internet connection", {
            className: "text-xs",
            toastId: customId,
            theme: NightState ? "dark" : "light",
          });
        }

        return;
      });
  };

  const fetchCoin = async () => {
    let localStorageList;
    if (typeof window !== "undefined") {
      localStorageList = parseJson(
        window.localStorage.getItem("PrevCoinSearchList")
      );
    }
    if (localStorageList) {
      setCoinSearchRes((prev: any) => {
        return { ...prev, data: [], res: 500 };
      });

      const setMulitpleStates = (data: any) => {
        console.log(data);
        if (data) {
          setCoinSearchRes((prev) => {
            return { ...prev, data: data.data, res: 200 };
          });

          const localStorageData = {
            data: data.data,
          };
          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "PrevCoinSearchList",
              JSON.stringify(localStorageData)
            );
          }
        }
      };

      setMulitpleStates(localStorageList);
    } else {
      const data = await axios
        .get("https://api.coingecko.com/api/v3/coins/list")
        .catch((err) => {
          console.log(err);
          setCoinSearchRes((prev: any) => {
            return { ...prev, data: [], res: 500 };
          });
          if (!toast.isActive(toastId.current)) {
            toast.error("Search Error, Please check your internet connection", {
              className: "text-xs",
              toastId: customId,
              theme: NightState ? "dark" : "light",
            });
          }

          return;
        })
        .then((data: any) => {
          console.log(data);
          if (data) {
            setCoinSearchRes((prev) => {
              return { ...prev, data: data.data, res: data.status };
            });

            const localStorageData = {
              data: data.data,
            };
            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                "PrevCoinSearchList",
                JSON.stringify(localStorageData)
              );
            }
          }
        });
    }
  };

  return (
    <div
      className={`w-full h-full  ${
        NightState ? "bg-ultraBlack" : "bg-white"
      } duration-300 font-inter lg:p-8 xl:p-16 lg:pt-4 xl:pt-4`}
    >
      <ToastContainer></ToastContainer>
      <div className="w-full h-fit flex flex-col items-center ">
        <div
          className={`duration-300 text-base font-inter p-4 lg:px-0   py-8 self-start ${
            NightState ? "text-white" : "text-ultraGray"
          } lg:text-5xl flex flex-col lg:flex-row lg:flex-row-reverse justify-between w-full `}
        >
          <div className="hidden lg:block">
            <DashDisplay></DashDisplay>
          </div>
          <div className=" lg:p-4 lg:text-4xl xl:text-4xl">
            {" "}
            Welcome <div className="text-green-400 ">Adrien</div>
          </div>
        </div>
        <div className="lg:hidden w-full">
          <DashDisplay></DashDisplay>
        </div>

        <ChartView
          clickedSetRange={clickedSetRange}
          setClickedSetRange={setClickedSetRange}
          key="ChartView"
          coinId={coinId}
          fecthDataonCoinSelect={fecthDataonCoinSelect}
          fecthDataonDateSelect={fecthDataonDateSelect}
          timeFrameFunc={reduxDurationDuration}
          timeFrame={ReduxDurationState}
          coinRes={coinSearchRes}
          fetchCoinList={fetchCoin}
          searchName={searchName}
          setSearchName={setSearchName}
          dataArray={coinData.data}
          setCoinId={setCoinId}
          setTimeFrame={setTimeFrame}
        ></ChartView>
        <div className="w-full">
          <RecentTrans data={recentTrans} key="reans"></RecentTrans>
        </div>
      </div>
    </div>
  );
}
