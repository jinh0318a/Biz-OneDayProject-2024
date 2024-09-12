import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();
export const userFindById = async (username) => {
  try {
    const user = await db.tbl_users.findUnique({
      where: { username: username },
    });

    db.$disconnect();
    return user;
  } catch (error) {
    db.$disconnect();
    console.log(error);
  }
};

export const userCreate = async (user) => {
  try {
    const password = user.password;
    const encPassword = await bcrypt.hash(password, 10);
    user.password = encPassword;

    const result = await db.tbl_users.create({ data: user });
    db.$disconnect();
    return result;
  } catch (error) {
    db.$disconnect();
    console.log(error);
  }
};
