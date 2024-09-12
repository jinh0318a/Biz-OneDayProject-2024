import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      // 추가
      const { r_div, r_start, r_end, r_dis, r_cost, r_place, r_username } =
        req.body;
      const newRecord = await prisma.tbl_records.create({
        data: {
          r_div,
          r_start,
          r_end,
          r_dis,
          r_cost,
          r_place,
          r_username,
        },
      });
      res.status(201).json(newRecord);
      break;

    case "PUT":
      // 수정
      const { r_no, updateData } = req.body;
      const updatedRecord = await prisma.tbl_records.update({
        where: { r_no },
        data: updateData,
      });
      res.status(200).json(updatedRecord);
      break;

    case "DELETE":
      // 삭제
      const { r_no: recordNoToDelete } = req.body;
      await prisma.tbl_records.delete({
        where: { r_no: recordNoToDelete },
      });
      res.status(204).end();
      break;

    case "GET":
      // 모든 레코드 가져오기
      const records = await prisma.tbl_records.findMany();
      res.status(200).json(records);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
