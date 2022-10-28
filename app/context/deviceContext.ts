import { createContext, Dispatch, SetStateAction } from "react";
import { IConnection } from "../types";

export const deviceContext = createContext<{
  context: IConnection[] | undefined;
  setContext: Dispatch<SetStateAction<IConnection[] | undefined>>;
}>({ context: undefined, setContext: () => undefined });
