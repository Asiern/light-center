import AsyncStorage from "@react-native-async-storage/async-storage";
import { IConnection } from "../types";
const connectionKey: string = "@connections2";

export async function storeConnection(connection: IConnection) {
  try {
    // Get connections from storage
    const connectionsString: string | null = await AsyncStorage.getItem(
      connectionKey
    );
    let connections: IConnection[];

    // If connections == null init, else parse string
    if (connectionsString === null) connections = [];
    else connections = JSON.parse(connectionsString);

    // Push connection to list
    connections.push(connection);

    // Save connections to storage
    await AsyncStorage.setItem(connectionKey, JSON.stringify(connections));
  } catch (error) {
    console.error(error);
  }
}

export async function readConnections(): Promise<IConnection[]> {
  try {
    // Get connections from storage
    const connectionsString: string | null = await AsyncStorage.getItem(
      connectionKey
    );
    // Return connections
    if (connectionsString != null) return JSON.parse(connectionsString);
    // Return undefined if connections undefined
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
