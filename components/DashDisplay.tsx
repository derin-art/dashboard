import SwipeableViews from "react-swipeable-views";
import { memo } from "react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useDispatch";

const wallets = [
  { name: "Dollar Wallet", val: "$2100", icon: "$" },
  { name: "Euro Wallet", val: "€100", icon: "€" },
  { name: "Pound Wallet", val: "£450", icon: "£" },
];

function DashDisplay() {
  const NightState = useAppSelector((state) => {
    return state.night.value.isNight;
  });
  const [galleryIndex, setGalleryIndex] = useState(0);
  console.log("sdsd", NightState);
  return (
    <div className="w-full text-base p-4 lg:w-[430px] xl:w-[500px]">
      <div className=" border border-gray-600 rounded-3xl relative carbonBg text-white  rounded p-4 h-48 lg:h-56 xl:h-60 h-full w-full font-Unbounded">
        <div className=" h-full flex items-center justify-center">
          <SwipeableViews
            onChangeIndex={(index) => {
              setGalleryIndex(index);
            }}
            index={galleryIndex}
            enableMouseEvents
            className="  py-8"
          >
            {wallets.map((item) => {
              return (
                <div
                  key={item.name}
                  className={`" text-6xl ${
                    NightState ? "text-white" : "text-green-400"
                  }  h-full flex justify-end overflow-hidden`}
                >
                  {item.val}
                </div>
              );
            })}
          </SwipeableViews>
          <div className="absolute flex top-4 right-4 space-x-4">
            {wallets.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    setGalleryIndex(index);
                  }}
                  className={`${
                    galleryIndex === index ? "text-white" : "text-gray-400"
                  } border h-6 border-gray-600 w-6 duration-300`}
                  key={item.icon}
                >
                  {item.icon}
                </button>
              );
            })}
          </div>
          <div
            className={`absolute text-xs ${
              NightState ? "text-gray-600" : "text-green-400"
            } bottom-4 left-4 `}
          >
            Swipe{" "}
            <span className="hidden lg:inline">or click on currency signs</span>{" "}
            to access wallet balance
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(DashDisplay);
