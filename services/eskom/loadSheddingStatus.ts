import axios from "axios";

const stages = (data: number): string => {
  if (data === 1) return "No Load Shedding";
  if (data >= 2 && data <= 9) return `Stage ${data - 1}`;
  return "Unknown";
};

export const getLoadsheddingStatus = async () => {
  const url = `https://loadshedding.eskom.co.za/LoadShedding/GetStatus`;

  const res = await axios.get(url);
  return {
    status: stages(res.data),
    raw: res.data,
  };
};
