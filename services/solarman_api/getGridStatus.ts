import axios from "axios";
import { getAccessToken } from "./accessToken";

export interface DataItem {
  name: string;
  value: string;
}

export const getGridStatus = async (): Promise<DataItem[]> => {
  const accessToken = await getAccessToken();
  const url = `https://${process.env.SOLARMAN_BASE_API}/device/v1.0/currentData?appId=${process.env.APP_ID}&language=en&=`;

  const res = await axios.post(
    url,
    { deviceSn: process.env.DEVICE_SERIAL },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
    },
  );

  return (res.data?.dataList ?? []) as DataItem[];
};
