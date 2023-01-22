import { Inter } from "@next/font/google";
import recentTrans from "../mockData/recentTrans";
import ChartView from "../components/ChartView";
import styles from "../styles/Home.module.css";
import coinGeckoChartData from "../mockData/coinGeckoChartData";
import { PropagateLoader, BounceLoader } from "react-spinners";
import axios from "axios";
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
  const [coinData, setCoinData] = useState([...coinGeckoChartData]);
  const [clickedSetRange, setClickedSetRange] = useState(false);
  const [searchTextMain, setSearchTextMain] = useState("");
  const [coinSearchRes, setCoinSearchRes] = useState({ data: [], res: {} });
  const [searchName, setSearchName] = useState("");
  const [timeFrame, setTimeFrame] = useState("1");
  const [coinId, setCoinId] = useState("bitcoin");

  console.log(timeFrame, "ss");

  const timeFrameFunc = (val: string) => {
    console.log(val, "clicked");
    setTimeFrame(val);
  };

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

  return (
    <div className="w-full h-full  bg-ultraBlack font-inter lg:p-8 xl:p-16 lg:pt-4 xl:pt-4">
      <ToastContainer></ToastContainer>
      <div className="w-full h-fit flex flex-col items-center ">
        <div className="text-base font-inter p-4 lg:px-0   py-8 self-start text-white lg:text-5xl flex flex-col lg:flex-row lg:flex-row-reverse justify-between w-full ">
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

        {coinData.length === 0 ? (
          <BounceLoader color="#36d7b7"></BounceLoader>
        ) : (
          <ChartView
            clickedSetRange={clickedSetRange}
            setClickedSetRange={setClickedSetRange}
            key="ChartView"
            timeFrameFunc={timeFrameFunc}
            timeFrame={timeFrame}
            coinRes={coinSearchRes}
            fetchCoinList={fetchCoin}
            searchName={searchName}
            setSearchName={setSearchName}
            dataArray={coinData}
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
