import prisma from "../../../db/index";

export const getLatestAccessToken = async () => {
  try {
    return await prisma.token.findFirst({
      orderBy: { expires: "desc" },
    });
  } catch (error) {
    return null;
  }
};
