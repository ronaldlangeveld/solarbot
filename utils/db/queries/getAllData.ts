import prisma from "../../../db/index";

export const getAllGridData = async () => {
  try {
    const rows = await prisma.gridStatus.findMany({
      orderBy: { timestamp: "desc" },
    });
    return rows.map((row) => ({ ...row, timestamp: Number(row.timestamp) }));
  } catch (error) {
    return [];
  }
};
