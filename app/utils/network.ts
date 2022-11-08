import axios from "axios";

export const PORT = 3951;
const TIMEOUT = 6000;

export function setRGB(ws: WebSocket, R: number, G: number, B: number) {
  try {
    ws.send(`CR${R}G${G}B${B}`);
  } catch (erro) {
    // TODO handle error
  }
}

export async function networkScan(ip: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (ip === "0.0.0.0") reject();

    console.log("Getting devices for net %s", ip);
    let resp: string[] = [];
    for (let i = 2; i < 255; i++) {
      let targetIP = ip.slice(0, ip.lastIndexOf(".") + 1) + i;
      try {
        let ws = new WebSocket(`ws://${targetIP}:${PORT}`);
        ws.onopen = () => {
          ws.send("P"); // Send ping message
        };

        ws.onmessage = () => {
          resp.push(targetIP);
          console.log("Device found: %s", targetIP);
        };

        setTimeout(() => ws.close(), TIMEOUT);
      } catch (error) {
        reject(error);
      }
    }

    resolve(resp);
  });
}
