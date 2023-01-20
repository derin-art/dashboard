type RecentTransProps = {
  data: {
    amount: number;
    bought: boolean;
    coin: string;
    date: string;
  }[];
};

export default function RecentTrans(props: RecentTransProps) {
  return (
    <div>
      <div className="flex flex-col space-y-4 w-full  p-4">
        <div className="text-gray-600 font-Unbounded">Recent Transactions</div>
        {props.data.map((item, index) => {
          return (
            <div
              className="flex border p-2 relative border-gray-600"
              key={index}
            >
              <div>
                <div className="font-Unbounded text-white">
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
