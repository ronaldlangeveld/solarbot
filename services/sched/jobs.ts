import { testPower } from "../tasks/testPower";
import { allDataMessage } from "../telegram_bot/templates";
import { sendTelegramMessage } from "../telegram_bot/index";

const FOUR_MINUTES = 4 * 60 * 1000;

export const startCron = () => {
  setInterval(async () => {
    const { batteryLevelNow, sunPower, consumptionNow, hasChanged } =
      await testPower();
    const message = allDataMessage(
      hasChanged.isOn,
      batteryLevelNow,
      sunPower,
      consumptionNow,
    );
    if (hasChanged.gridChange) {
      await sendTelegramMessage(process.env.RECIPIENT_ID ?? "", message);
    }
  }, FOUR_MINUTES);
};
