import { RootState } from "../store";
import { AppDispatch } from "../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import exp from "constants";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
