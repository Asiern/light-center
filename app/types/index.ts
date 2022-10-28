export interface IConnection {
  name: string;
  description: string;
  ip: string;
  color: string;
  tags: string[];
}

export type RootStackParamList = {
  Home: undefined;
  Device: { props: IConnection };
  Devices: undefined;
  DeviceEditor: undefined;
  DeviceConfig: undefined;
};
