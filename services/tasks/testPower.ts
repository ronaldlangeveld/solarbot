import { getGridStatus } from "../solarman_api/getGridStatus";
import { getLatestGridFrequency } from "../../utils/db/queries/getLatestGridFreq";
import prisma from "../../db/index";

export const testPower = async () => {
  const status = await getGridStatus();

  const gridFrequencyNow = status.find((s) => s.name === "Grid Frequency");
  const batteryLevelNow = status.find((s) => s.name === "SoC");
  const sunPower = status.find((s) => s.name === "Total DC Input Power");
  const consumptionNow = status.find(
    (s) => s.name === "Total Consumption Power",
  );

  const gridFrequencyLatest = await getLatestGridFrequency();

  const hasChanged = {
    gridChange: false,
    isOn: +(gridFrequencyNow?.value ?? 0) !== 0,
  };

  if (
    !gridFrequencyLatest ||
    +(gridFrequencyNow?.value ?? 0) !== Number(gridFrequencyLatest.status)
  ) {
    await prisma.gridStatus.create({
      data: {
        status: +(gridFrequencyNow?.value ?? 0),
        timestamp: BigInt(Date.now()),
        battery_level: +(batteryLevelNow?.value ?? 0) || 0,
        production: +(sunPower?.value ?? 0) || 0,
        consumption: +(consumptionNow?.value ?? 0) || 0,
      },
    });

    if (
      Number(gridFrequencyLatest?.status) === 0 &&
      +(gridFrequencyNow?.value ?? 0) > 0
    ) {
      hasChanged.gridChange = true;
    }
    if (
      Number(gridFrequencyLatest?.status) !== 0 &&
      +(gridFrequencyNow?.value ?? 0) === 0
    ) {
      hasChanged.gridChange = true;
    }
  }

  return {
    gridFrequencyNow,
    batteryLevelNow,
    sunPower,
    consumptionNow,
    gridFrequencyLatest,
    hasChanged,
  };
};
