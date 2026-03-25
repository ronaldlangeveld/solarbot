interface DataField {
  value?: string;
}

export const allDataMessage = (
  status: boolean,
  batteryLevelNow?: DataField,
  sunPower?: DataField,
  consumptionNow?: DataField,
): string => {
  return `${status ? `⚡️ POWER IS ON` : `🚨 POWER IS OFF`} \n\n🔋 at ${batteryLevelNow?.value}%\n\n ☀️ Producing ${+(sunPower?.value ?? 0) / 1000} kW \n\n 🏡 Current Consumption ${+(consumptionNow?.value ?? 0) / 1000} kW`;
};
