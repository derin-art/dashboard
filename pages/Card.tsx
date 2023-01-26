import DebitCards from "../components/DebitCards";
import { useAppSelector } from "../hooks/useDispatch";

export default function Card() {
  const NightState = useAppSelector((state) => state.night.value.isNight);
  const cards = [{ isMaster: false }, { isMaster: true }];
  return (
    <div
      className={`  ${
        NightState ? "bg-ultraBlack" : "bg-white"
      } duration-300 h-screen w-full font-Inter`}
    >
      <div
        className={`p-4 font-Inter text-lg pt-8 ${
          NightState ? "text-white" : "text-ultraGray"
        }`}
      >
        <div>Debit</div>
        <div className="text-green-400">Cards</div>
      </div>
      <div>
        {cards.map((item, index) => {
          return (
            <DebitCards key={index} masterCard={item.isMaster}></DebitCards>
          );
        })}
      </div>
    </div>
  );
}
