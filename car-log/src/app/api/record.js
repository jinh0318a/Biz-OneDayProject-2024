import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const recordFindByUsername = async (username) => {
  try {
    const records = await db.tbl_logs.findUnique({
      where: { log_userid: username },
    });

    db.$disconnect();
    return records;
  } catch (error) {
    db.$disconnect();
    console.log(error);
  }
};

export const recordFindByID = async (id) => {
  try {
    const record = await db.tbl_logs.findUnique({
      where: { log_no: id },
    });

    db.$disconnect();
    return record;
  } catch (error) {
    db.$disconnect();
    console.log(error);
  }
};
