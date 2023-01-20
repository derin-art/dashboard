import { type } from "os";
import Header from "../../components/display/Header";

type WrapperProps = {
  children: any;
};

export default function Wrapper(props: WrapperProps) {
  return (
    <div className="w-full h-full bg-ultraBlack relative">
      <Header></Header>
      <div className="pb-14 "> {props.children}</div>
    </div>
  );
}
