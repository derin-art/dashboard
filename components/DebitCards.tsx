import { useState } from "react";
import VisaIcon from "../public/icon/VisaIcon";

export default function DebitCards() {
  const [click, setClicked] = useState(false);
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
          className={`${
            click ? "flip-content1" : "flip-content "
          } h-full w-full radialPattern`}
        >
          <div
            className={`${
              !click ? "hidden" : ""
            } flip-front border border-gray-600 rounded-lg relative`}
          >
            <div className="absolute top-4 text-xs left-4 text-white text-gray-400">
              Click to rotate Card
            </div>
            <div className="text-gray-400 text-base mt-20">
              <div>CVV</div>111
            </div>
            <div className="absolute bottom-2 right-4">
              {VisaIcon("fill-white ", "38", "38")}
            </div>
          </div>
          <div className="flip-back border border-gray-600 relative rounded-lg">
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
            <div className="text-gray-400 absolute bottom-10 w-full text-xs flex items-center justify-center">
              valid thru <span className="text-base ml-2">05/28</span>
            </div>
            <div className="absolute bottom-4 h-20 left-4 text-white text-gray-400">
              Adrien Phillip
            </div>
            <div className="absolute top-4 text-xs left-4 text-white text-gray-400">
              Click to rotate Card
            </div>
            <div className="absolute bottom-2 right-4">
              {VisaIcon("fill-white ", "38", "38")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
