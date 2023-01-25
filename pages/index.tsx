import { Inter } from "@next/font/google";
import recentTrans from "../mockData/recentTrans";
import ChartView from "../components/ChartView";
import styles from "../styles/Home.module.css";
import coinGeckoChartData from "../mockData/coinGeckoChartData";
import { PropagateLoader, BounceLoader } from "react-spinners";
import { change, setGraphData, setResponse } from "../features/nigthLifeSlice";
import axios from "axios";
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

  const fecthData = async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=180`
      )
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const fecthDataonCoinSelect = async (id: string = coinId) => {
    setCoinData((prev) => ({ ...prev, data: [] }));
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${timeFrame}`
      )
      .then((data) => {
        console.log(data.data);
        if (data) {
          dispatch(setGraphData(data.data));
          dispatch(setResponse(data.status));
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

  const fecthDataonDateSelect = async (time: string = timeFrame) => {
    setCoinData((prev) => ({ ...prev, data: [] }));
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${time}`
      )
      .then((data) => {
        console.log("red", data);
        console.log(data.data);
        if (data) {
          dispatch(setGraphData(data.data));
          dispatch(setResponse(data.status));
          setCoinData((prev) => ({ ...prev, data: data.data }));
        }
      })
      .catch((err) => {
        console.log(err);
        if (!toast.isActive(toastId.current)) {
          toast.error("Search Error, Please check your internet connection", {
            className: "text-xs",
            toastId: customId,
            theme: "dark",
          });
        }

        return;
      });
  };

  const fetchCoin = async () => {
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
        }
      });
  };

  const NightState = useAppSelector((state) => state.night.value.isNight);

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

        {coinData.data.length === 0 ? (
          <BounceLoader color="#4ade80"></BounceLoader>
        ) : (
          <ChartView
            clickedSetRange={clickedSetRange}
            setClickedSetRange={setClickedSetRange}
            key="ChartView"
            coinId={coinId}
            fecthDataonCoinSelect={fecthDataonCoinSelect}
            fecthDataonDateSelect={fecthDataonDateSelect}
            timeFrameFunc={timeFrameFunc}
            timeFrame={timeFrame}
            coinRes={coinSearchRes}
            fetchCoinList={fetchCoin}
            searchName={searchName}
            setSearchName={setSearchName}
            dataArray={coinData.data}
            setCoinId={setCoinId}
            setTimeFrame={setTimeFrame}
          ></ChartView>
        )}
        <div className="w-full">
          <RecentTrans data={recentTrans} key="reans"></RecentTrans>
        </div>
      </div>

      <div>
        <DebitCards></DebitCards>
      </div>
    </div>
  );
}
