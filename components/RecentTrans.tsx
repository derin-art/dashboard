type RecentTransProps = {
  data: {
    amount: number;
    bought: boolean;
    coin: string;
    date: string;
  }[];
};

import { useAppSelector } from "../hooks/useDispatch";

export default function RecentTrans(props: RecentTransProps) {
  const NightState = useAppSelector((state) => state.night.value.isNight);
  return (
    <div>
      <div className="flex flex-col space-y-4 w-full  p-4">
        <div className="text-gray-600 font-Unbounded lg:text-3xl">
          Recent Transactions
        </div>
        {props.data.map((item, index) => {
          return (
            <div
              className={`flex border rounded p-2 duration-300 relative  ${
                NightState ? "border-gray-600" : "bg-gray-100"
              }`}
              key={index}
            >
              <div>
                <div
                  className={`duration-300 font-Unbounded ${
                    NightState ? "text-white" : "text-ultraGray"
                  }`}
                >
                  {item.amount} {item.coin}
                </div>
                <div className="text-xs text-green-400">{item.date}</div>
              </div>
              <div className="absolute right-8 flex flex-col h-full top-0 items-center justify-center">
                <div
                  className={`${
                    item.bought ? "text-keppelG" : "text-bsRed"
                  } text-[8px]  rounded-full h-8 w-8  text-white font-inter flex items-center justify-center`}
                >
                  {item.bought ? "bought" : "sold"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
