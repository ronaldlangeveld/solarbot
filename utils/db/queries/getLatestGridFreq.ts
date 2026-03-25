import prisma from "../../../db/index";

export const getLatestGridFrequency = async () => {
  try {
    const row = await prisma.gridStatus.findFirst({
      orderBy: { timestamp: "desc" },
    });
    if (!row) return null;
    return { ...row, timestamp: Number(row.timestamp) };
  } catch (error) {
    return null;
  }
};
