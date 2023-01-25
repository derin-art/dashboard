import { type } from "os";
import Header from "../../components/display/Header";
import { useAppSelector } from "../../hooks/useDispatch";

type WrapperProps = {
  children: any;
};

export default function Wrapper(props: WrapperProps) {
  const NightState = useAppSelector((state) => state.night.value.isNight);
  return (
    <div
      className={`w-full h-full ${
        NightState ? "bg-ultraBlack" : "bg-white"
      } relative duration-300`}
    >
      <Header></Header>
      <div className="pb-14 "> {props.children}</div>
    </div>
  );
}
