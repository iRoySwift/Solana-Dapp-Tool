import { RootState, AppDispatch } from "@/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
