import prisma from "../../../db/index";
import { format } from "date-fns";
import _ from "lodash";

export const getOutagesCount = async () => {
  try {
    const outages = await prisma.gridStatus.findMany({
      where: { status: 0 },
      select: { timestamp: true },
      orderBy: { timestamp: "asc" },
    });

    const total = outages.map((o) => {
      const date = format(new Date(Number(o.timestamp)), "yyyy-MM-dd");
      return { date };
    });

    return _(total)
      .groupBy("date")
      .map((items, key) => ({ date: key, count: items.length }))
      .value();
  } catch (error) {
    return [];
  }
};
