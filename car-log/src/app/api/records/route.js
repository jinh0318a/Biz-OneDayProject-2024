import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // 모든 레코드 가져오기
  const records = await prisma.tbl_records.findMany();
  return new Response(JSON.stringify(records), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  // 추가
  const { r_div, r_start, r_end, r_dis, r_cost, r_place, r_username } =
    await request.json();
  const newRecord = await prisma.tbl_records.create({
    data: {
      r_div,
      r_start,
      r_end,
      r_dis: r_dis ? parseInt(r_dis, 10) : null,
      r_cost: r_cost ? parseInt(r_cost, 10) : null,
      r_place,
      r_username,
    },
  });
  return new Response(JSON.stringify(newRecord), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request) {
  // 수정
  const { r_no, updateData } = await request.json();
  const updatedRecord = await prisma.tbl_records.update({
    where: { r_no },
    data: updateData,
  });
  return new Response(JSON.stringify(updatedRecord), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request) {
  // 삭제
  const { r_no } = await request.json();
  await prisma.tbl_records.delete({
    where: { r_no },
  });
  return new Response(null, { status: 204 });
}
