import { INetwork } from "../types";

export async function networkScan(): Promise<INetwork[]> {
  return new Promise((resolve, reject) => {
    let response: INetwork[] = [];
    resolve(response);
  });
}
