import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Point,
  defaults,
  Filler,
  ScriptableContext,
} from "chart.js";

import { coinGeckoArr } from "../pages/index";
import { Gradient } from "chartjs-plugin-gradient/types/options";
import { BounceLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import gradient from "chartjs-plugin-gradient";
import BitcoinIcon from "../public/icon/BitcoinIcon";
import CoinIcon from "../public/icon/CoinIcon";
import useMediaQuery from "../hooks/useMediaQuery";
import { Doughnut, Line, ChartProps } from "react-chartjs-2";
import { format } from "date-fns";
import { Dispatch, useEffect, useRef } from "react";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  TimeScale,
  LineElement,
} from "chart.js";
defaults.font.family = "inter";
import { getRelativePosition } from "chart.js/helpers";
import { dataArray } from "../pages/index";
import { useState } from "react";
Chart.register(gradient);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(CategoryScale);
Chart.register(LineElement);
Chart.register(Tooltip);
Chart.register(TimeScale);
Chart.register(Filler);

Chart.register(ArcElement);

type ChartViewProps = {
  dataArray: coinGeckoArr;
  fetchCoinList: () => void;
  coinRes: {
    data: {
      id: string;
      symbol: string;
      name: string;
    }[];
    res: any;
  };
  searchName: string;
  setSearchName: any;
  setCoinId: any;
  coinId: string;
  setTimeFrame: any;
  timeFrame: string;
  timeFrameFunc: (val: string) => void;
  clickedSetRange: boolean;
  setClickedSetRange: any;
  fecthDataonDateSelect: (time: string) => void;
  fecthDataonCoinSelect: (id: string) => void;
};

export default function ChartView(props: ChartViewProps) {
  const chartRef = useRef(null);
  let chart: any = null;
  chart = chartRef.current;

  const { height, width } = useMediaQuery();
  const isMobile = width ? width < 640 : false;

  const [GraphData, setGraphData] = useState({
    labels: props.dataArray.map((coinData) => {
      var s =
        props.timeFrame === "1"
          ? new Date(coinData[0]).toLocaleTimeString("en-US")
          : new Date(coinData[0]).toLocaleDateString("en-US");
      return s;
    }),
    datasets: [
      {
        data: props.dataArray.map((item) => {
          return item[4];
        }),
        borderColor: "rgb(74, 222, 128)",
        backgroundColor: "rgb(255 237 213)",
        borderWidth: 1,
        fill: {
          target: "origin", // 3. Set the fill options
          above: "rgba(189, 211, 197, 0.1)",
        },
        tension: 0.3,
      },
    ],
  });

  const timeRanges = [
    { name: "1wk", val: "7" },
    { name: "1day", val: "1" },
    { name: "1mth", val: "30" },
    { name: "6mth", val: "180" },
    { name: "1yr", val: "365" },
  ];

  const responseErr = props.coinRes.res === 500;

  return (
    <div className="w-full h-fit lg:p-4  p-2 relative ">
      <div
        className={`w-full ${
          props.searchName ? "h-48" : "h-10"
        } duration-300 border border-gray-600 mb-4 p-1 rounded-lg flex  flex-col`}
      >
        <div className="flex items-center w-full h-fit  mt-[2px]">
          <button className="h-full rounded-full w-10 flex items-center justify-center ">
            {CoinIcon("fill-green-400")}
          </button>
          <input
            onChange={(e) => {
              props.setSearchName(e.target.value);
              props.fetchCoinList();
            }}
            value={props.searchName}
            placeholder={"Search for a coin"}
            className="w-11/12 text-sm ml-2 mr-[14px] font-inter h-fit bg-transparent focus:outline-none focus:ring-b-[1px] text-green-400 focus:ring-gray-600"
          ></input>
        </div>
        <div
          className={`h-full overflow-auto text-white text-xs ${
            props.searchName ? "flex" : "hidden"
          } flex-col mt-4 p-2`}
        >
          {props.coinRes.data[0] ? (
            props.coinRes.data.filter((coin) => {
              if (
                coin.name.toLowerCase().includes(props.searchName.toLowerCase())
              ) {
                return coin;
              }
            }).length > 0 ? (
              props.coinRes.data.map((coin) => {
                if (
                  coin.name
                    .toLowerCase()
                    .includes(props.searchName.toLowerCase())
                ) {
                  return (
                    <button
                      onClick={() => {
                        props.setCoinId(coin.id);
                        props.fecthDataonCoinSelect(coin.id);
                      }}
                      className="p-2 mb-2 border border-gray-600"
                      key={coin.id}
                    >
                      {coin.name}
                    </button>
                  );
                }
              })
            ) : (
              <div className="w-full h-full items-center justify-center text-white flex">
                No coin matches your coin parameters
              </div>
            )
          ) : (
            <div className="w-full h-full mb-8 items-center justify-center flex ">
              <BounceLoader color="#4ade80"></BounceLoader>
            </div>
          )}
        </div>
      </div>

      <div className="font-Unbounded mb-2 text-green-400 lg:text-3xl flex relative">
        {props.coinId}
        <div
          className={`${
            props.clickedSetRange ? "w-fit" : "w-10"
          } h-10 duration-300 border-gray-600 border absolute right-0 text-[9px] text-white font-inter lg:hidden rounded-full top-0 flex items-center justify-center`}
        >
          {timeRanges.map((item, index) => {
            if (item.val !== props.timeFrame) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    props.timeFrameFunc(item.val);
                    props.setClickedSetRange((prev: any) => !prev);
                    props.fecthDataonDateSelect(item.val);
                  }}
                  className={`${
                    props.clickedSetRange ? "" : "hidden"
                  } w-10 h-10 border duration-300 rounded-full ${
                    props.timeFrame === item.val
                      ? "border-green-400"
                      : "border-gray-600"
                  }`}
                >
                  {item.name}
                </button>
              );
            }
          })}
          <button
            onClick={() => {
              props.setClickedSetRange((prev: any) => !prev);
            }}
            className={`border w-10 h-10 duration-300 border border-green-400 rounded-full`}
          >
            {timeRanges.map((item) => {
              if (item.val === props.timeFrame) {
                return (
                  <div className="" key={item.name}>
                    {item.name}
                  </div>
                );
              }
            })}
          </button>
        </div>
        <div
          className={`w-fit hidden h-10 duration-300 border-gray-600 border absolute right-0 text-[9px] text-white font-inter rounded-full top-0 lg:flex  items-center justify-center`}
        >
          {timeRanges.map((item) => {
            if (item.val !== "1day") {
              return (
                <button
                  key={item.name}
                  className={` w-10 h-10 border rounded-full border-t border-gray-600`}
                >
                  {item.name}
                </button>
              );
            }
          })}
          <button className="border w-10 h-10 border border-gray-600 rounded-full">
            {timeRanges[1].name}
          </button>
        </div>
      </div>
      <div className="w-fit h-fit hidden 2xl:block relative">
        <Line
          data={GraphData}
          style={{
            width: 1350,
            height: 550,
            border: "0px #242424 solid",
            borderRadius: "10px",
            color: "#242424",
            padding: "30px",
          }}
          options={{
            layout: {},
            elements: {
              point: {
                radius: 1.5,

                pointStyle: "circle",
                backgroundColor: "#242424",
                borderColor: "#242424",
              },
            },
            responsive: true,
            scales: {
              y: {
                border: { display: false },

                grid: {
                  display: false, // <-- this removes y-axis line
                  lineWidth: function (context) {
                    return context?.index === 0 ? 0 : 1; // <-- this removes the base line
                  },
                  color: "#2E294E",
                  drawOnChartArea: false,
                  tickColor: "#2E294E",
                },
                ticks: {
                  padding: 4,
                  font: { family: "inter", size: 10 },
                  color: "white",
                  display: true,
                },
              },
              x: {
                bounds: "ticks",
                border: { display: false },

                grid: {
                  lineWidth: 0,
                  tickColor: props.dataArray.map((item, index) => {
                    if (index % 4 === 0) {
                      return "white";
                    } else return "";
                  }),
                  // <-- this removes vertical lines between bars
                },
                ticks: {
                  padding: 20,
                  font: { family: "inter", size: 12 },
                  color: props.dataArray.map((item, index) => {
                    return "white";
                  }),
                  autoSkip: true,
                  maxTicksLimit: 10,
                  labelOffset: 4,
                  count: 4,
                },
              },
            },

            plugins: {
              title: {
                display: false,
                text: "Users Gained between 2016-2020",
              },
              legend: {
                display: false,
                labels: {
                  font: {
                    family: "var(--inter-font)",
                  },
                  color: "red",
                },
              },
              tooltip: {
                bodySpacing: 8,
                enabled: true,
              },
            },

            borderColor: "rgba(0,22, 222, 200)",
            backgroundColor: "rgb(255 237 213)",

            animation: { delay: 1, easing: "linear" },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="w-fit h-fit hidden xl:block 2xl:hidden relative">
        <Line
          data={GraphData}
          style={{
            width: 1050,
            height: 600,
            border: "0px #242424 solid",
            borderRadius: "10px",
            color: "#242424",
            padding: "30px",
          }}
          options={{
            layout: {},
            elements: {
              point: {
                radius: 1.5,

                pointStyle: "circle",
                backgroundColor: "#242424",
                borderColor: "#242424",
              },
            },
            responsive: true,
            scales: {
              y: {
                border: { display: false },

                grid: {
                  display: false, // <-- this removes y-axis line
                  lineWidth: function (context) {
                    return context?.index === 0 ? 0 : 1; // <-- this removes the base line
                  },
                  color: "#2E294E",
                  drawOnChartArea: false,
                  tickColor: "#2E294E",
                },
                ticks: {
                  padding: 6,
                  font: { family: "inter", size: 10 },
                  color: "white",
                  display: true,
                },
              },
              x: {
                bounds: "ticks",
                border: { display: false },

                grid: {
                  lineWidth: 0,
                  tickColor: props.dataArray.map((item, index) => {
                    if (index % 4 === 0) {
                      return "white";
                    } else return "";
                  }),
                  // <-- this removes vertical lines between bars
                },
                ticks: {
                  padding: 20,
                  font: { family: "inter", size: 12 },
                  color: props.dataArray.map((item, index) => {
                    return "white";
                  }),
                  autoSkip: true,
                  maxTicksLimit: 10,
                  labelOffset: 4,
                  count: 4,
                },
              },
            },

            plugins: {
              title: {
                display: false,
                text: "Users Gained between 2016-2020",
              },
              legend: {
                display: false,
                labels: {
                  font: {
                    family: "var(--inter-font)",
                  },
                  color: "red",
                },
              },
              tooltip: {
                bodySpacing: 8,
                enabled: true,
              },
            },

            borderColor: "rgba(0,22, 222, 200)",
            backgroundColor: "rgb(255 237 213)",

            animation: { delay: 1, easing: "linear" },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="w-fit h-fit hidden lg:block xl:hidden relative">
        <Line
          data={GraphData}
          style={{
            width: 750,
            height: 500,
            border: "0px #242424 solid",
            borderRadius: "10px",
            color: "#242424",
            padding: "30px",
          }}
          options={{
            layout: {},
            elements: {
              point: {
                radius: 1.5,

                pointStyle: "circle",
                backgroundColor: "#242424",
                borderColor: "#242424",
              },
            },
            responsive: true,
            scales: {
              y: {
                border: { display: false },

                grid: {
                  display: false, // <-- this removes y-axis line
                  lineWidth: function (context) {
                    return context?.index === 0 ? 0 : 1; // <-- this removes the base line
                  },
                  color: "#2E294E",
                  drawOnChartArea: false,
                  tickColor: "#2E294E",
                },
                ticks: {
                  padding: 6,
                  font: { family: "inter", size: 10 },
                  color: "white",
                  display: true,
                },
              },
              x: {
                bounds: "ticks",
                border: { display: false },

                grid: {
                  lineWidth: 0,
                  tickColor: props.dataArray.map((item, index) => {
                    if (index % 4 === 0) {
                      return "white";
                    } else return "";
                  }),
                  // <-- this removes vertical lines between bars
                },
                ticks: {
                  padding: 20,
                  font: { family: "inter", size: 12 },
                  color: props.dataArray.map((item, index) => {
                    return "white";
                  }),
                  autoSkip: true,
                  maxTicksLimit: 10,
                  labelOffset: 4,
                  count: 4,
                },
              },
            },

            plugins: {
              title: {
                display: false,
                text: "Users Gained between 2016-2020",
              },
              legend: {
                display: false,
                labels: {
                  font: {
                    family: "var(--inter-font)",
                  },
                  color: "red",
                },
              },
              tooltip: {
                bodySpacing: 8,
                enabled: true,
              },
            },

            borderColor: "rgba(0,22, 222, 200)",
            backgroundColor: "rgb(255 237 213)",

            animation: { delay: 1, easing: "linear" },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="  block lg:hidden w-full h-fit flex items-center justify-center relative">
        <Line
          data={GraphData}
          ref={chartRef}
          style={{
            border: "0px #FFEFEB solid",
            borderRadius: "5px",
            color: "#242424",

            paddingLeft: "2px",

            width: "80vw",
          }}
          options={{
            layout: {},
            elements: {
              point: {
                radius: 0.6,

                pointStyle: "circle",
                backgroundColor: "#fafafa",
                borderColor: "#242424",
              },
            },
            scales: {
              y: {
                border: { display: false },

                grid: {
                  display: false, // <-- this removes y-axis line
                  lineWidth: function (context) {
                    return context?.index === 0 ? 0 : 1; // <-- this removes the base line
                  },
                  color: "#2E294E",
                  drawOnChartArea: false,
                  tickColor: "#2E294E",
                },
                ticks: {
                  padding: 4,
                  font: { family: "inter", size: 7 },
                  color: "white",
                  display: true,
                },
              },
              x: {
                bounds: "ticks",
                border: { display: false },

                grid: {
                  lineWidth: 0,
                  tickColor: props.dataArray.map((item, index) => {
                    if (index % 4 === 0) {
                      return "white";
                    } else return "";
                  }),
                  // <-- this removes vertical lines between bars
                },
                ticks: {
                  padding: 10,
                  font: { family: "inter", size: 8 },
                  color: props.dataArray.map((item, index) => {
                    return "white";
                  }),
                  display: true,
                  autoSkip: true,
                  maxTicksLimit: 10,
                  labelOffset: 4,
                  count: 4,
                },
              },
            },

            plugins: {
              title: {
                display: false,
                text: "Users Gained between 2016-2020",
              },
              legend: {
                display: false,
                labels: {
                  font: {
                    family: "var(--inter-font)",
                  },
                  color: "red",
                },
              },
              tooltip: {
                bodySpacing: 8,
                enabled: true,
              },
            },

            animation: { delay: 1, easing: "linear" },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}
/* ({ chart: { ctx } }) => {
          const bg = ctx.createLinearGradient("0", "0", "170", "0");
          bg.addColorStop(0, "black");
          bg.addColorStop(1, "white");
          // More config for your gradient
          return bg;
        }, */
