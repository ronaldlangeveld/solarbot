import { Bot } from "gramio";
import { testPower } from "../tasks/testPower";
import { allDataMessage } from "./templates";
import { getAllGridData } from "../../utils/db/queries/getAllData";

const token = process.env.TELEGRAM_TOKEN ?? "";

export const bot = new Bot(token);

export const sendTelegramMessage = async (
  chatId: string | number,
  message: string,
): Promise<void> => {
  await bot.api.sendMessage({
    chat_id: chatId,
    text: message,
    parse_mode: "HTML",
  });
};

bot.command("now", async (context) => {
  const { batteryLevelNow, sunPower, consumptionNow, hasChanged } =
    await testPower();
  const message = allDataMessage(
    hasChanged.isOn,
    batteryLevelNow,
    sunPower,
    consumptionNow,
  );
  await context.send(message);
});

bot.command("debug", async (context) => {
  const status = await testPower();
  await context.send(JSON.stringify(status));
});

bot.command("outages", async (context) => {
  const allData = await getAllGridData();
  const outages = allData.filter(
    (data: { status: any }) => Number(data.status) === 0,
  );
  const last = outages.at(-1)?.timestamp;
  const message = `📊 ${outages.length} outages since ${
    last ? new Date(Number(last)).toLocaleString() : "unknown"
  }`;
  await context.send(message);
});
