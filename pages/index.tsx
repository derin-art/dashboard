import { Inter } from "@next/font/google";
import recentTrans from "../mockData/recentTrans";
import ChartView from "../components/ChartView";
import styles from "../styles/Home.module.css";
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

export default function Home() {
  const toastId: any = useRef(null);
  const customId = "custom-id-yes";
  const [coinData, setCoinData] = useState([...chartData]);
  const [coinSearchRes, setCoinSearchRes] = useState({ data: [], res: {} });
  const [searchName, setSearchName] = useState("");
  const fecthData = async () => {
    await axios
      .get(
        `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1HRS&time_start=2016-01-01T00:00:00&time_end=2016-02-01T00:00:00`,
        {
          headers: { "X-CoinAPI-Key": process.env.NEXT_PUBLIC_coinApiKey },
        }
      )
      .then((data) => {
        setCoinData(data.data);
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
          return { ...prev, data: null, res: 500 };
        });
        if (!toast.isActive(toastId.current)) {
          toast.error("Search Error", {
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

  useEffect(() => {
    return;
    fecthData();
  }, []);

  return (
    <div className="w-full h-full  bg-ultraBlack font-inter lg:p-8 xl:p-16">
      <ToastContainer></ToastContainer>
      <div className="w-full h-fit flex flex-col items-center ">
        <div className="text-base font-inter p-4 py-8 self-start text-white lg:text-5xl">
          Welcome <div className="text-green-400">Adrien</div>
        </div>
        <DashDisplay></DashDisplay>
        {coinData.length === 0 ? (
          <BounceLoader color="#36d7b7"></BounceLoader>
        ) : (
          <ChartView
            coinRes={coinSearchRes}
            fetchCoinList={fetchCoin}
            searchName={searchName}
            setSearchName={setSearchName}
            dataArray={coinData}
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

/*   <BounceLoader  color="#36d7b7" /> */
