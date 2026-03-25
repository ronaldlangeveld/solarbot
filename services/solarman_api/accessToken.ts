import axios from "axios";
import { getLatestAccessToken } from "../../utils/db/queries/getLatestAccessToken";
import prisma from "../../db/index";

export const getAccessToken = async (): Promise<string> => {
  const latestAccessToken = await getLatestAccessToken();

  if (
    !latestAccessToken?.access ||
    (latestAccessToken.expires !== null &&
      latestAccessToken.expires < BigInt(Date.now()))
  ) {
    const url = `https://${process.env.SOLARMAN_BASE_API}/account/v1.0/token?appId=${process.env.APP_ID}&language=en&=`;
    const body = {
      appSecret: process.env.APP_SECRET,
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    };

    const res = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    const expires_in = BigInt(res.data.expires_in * 1000) + BigInt(Date.now());

    await prisma.token.create({
      data: {
        access: res.data.access_token,
        refresh: res.data.refresh_token,
        expires: expires_in,
      },
    });

    return res.data.access_token as string;
  }

  return latestAccessToken.access;
};
