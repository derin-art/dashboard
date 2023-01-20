import { Inter } from "@next/font/google";
import recentTrans from "../mockData/recentTrans";
import ChartView from "../components/ChartView";
import styles from "../styles/Home.module.css";
import { PropagateLoader, BounceLoader } from "react-spinners";
import axios from "axios";
import RecentTrans from "../components/RecentTrans";
import DashDisplay from "../components/DashDisplay";
import chartData from "../mockData/chartData";
import { useEffect, useState } from "react";
import { type } from "os";
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
  const [coinData, setCoinData] = useState([...chartData]);
  const [coinSearchRes, setCoinSearchRes] = useState({ data: [], res: {} });
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
      })
      .then((data: any) => {
        setCoinSearchRes((prev) => {
          return { ...prev, data: data.data };
        });
      });
  };

  useEffect(() => {
    return;
    fecthData();
  }, []);

  return (
    <div className="w-full h-full  bg-ultraBlack font-inter ">
      <div className="w-full h-fit flex flex-col items-center ">
        <div className="text-base font-inter p-4 py-8 self-start text-white">
          Welcome <div className="text-green-400">Adrien</div>
        </div>
        <DashDisplay></DashDisplay>
        {coinData.length === 0 ? (
          <BounceLoader color="#36d7b7"></BounceLoader>
        ) : (
          <ChartView
            coinRes={coinSearchRes}
            fetchCoinList={fetchCoin}
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
