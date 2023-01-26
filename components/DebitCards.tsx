import { useState } from "react";
import VisaIcon from "../public/icon/VisaIcon";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";

export default function DebitCards() {
  const [click, setClicked] = useState(false);
  const NightState = useAppSelector((state) => state.night.value.isNight);
  const randomNo = [
    [1, 5, 2, 4],
    [1, 4, 5, 6],
    [1, 3, 5, 5],
    [, 1, 2, 3, 4],
  ];

  return (
    <div className="p-4">
      <div
        onClick={() => {
          setClicked((prev) => !prev);
        }}
        className="flip w-full h-48 lg:w-80 "
      >
        <div
          className={`duration-300 ${
            click ? "flip-content1" : "flip-content "
          } h-full w-full ${
            NightState ? "radialPattern" : "radialPatternLight"
          }`}
        >
          <div
            className={`${!click ? "hidden" : ""} flip-front border ${
              NightState
                ? "border-gray-600 text-gray-400"
                : "border-gray-300 text-ultraGray"
            } rounded-lg relative`}
          >
            <div className="absolute top-4 text-xs left-4">
              Click to rotate Card
            </div>
            <div className=" text-base mt-20">
              <div>CVV</div>111
            </div>
            <div className="absolute bottom-2 right-4">
              {VisaIcon(
                `${NightState ? "fill-white" : "fill-green-400"}`,
                "38",
                "38"
              )}
            </div>
          </div>
          <div
            className={`flip-back border  ${
              NightState
                ? "border-gray-600 text-gray-400"
                : "border-gray-300 text-ultraGray"
            } relative rounded-lg`}
          >
            <div className="items-center justify-center space-x-4 flex w-full  text-green-400 text-xl mt-20">
              {randomNo.map((item, index) => {
                return (
                  <span key={index} className="flex">
                    {item.map((no) => {
                      return no;
                    })}
                  </span>
                );
              })}
            </div>
            <div className=" absolute bottom-10 w-full text-xs flex items-center justify-center">
              valid thru <span className="text-base ml-2">05/28</span>
            </div>
            <div className="absolute bottom-4 h-20 left-4 ">Adrien Phillip</div>
            <div className="absolute top-4 text-xs left-4 ">
              Click to rotate Card
            </div>
            <div className="absolute bottom-2 right-4">
              {VisaIcon(
                `${NightState ? "fill-white" : "fill-green-400"}`,
                "38",
                "38"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
