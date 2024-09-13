import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // 요청 URL에서 쿼리 파라미터를 추출합니다
    const url = new URL(req.url, `http://${req.headers.host}`);
    const username = url.searchParams.get("username");

    // 사용자 이름이 없는 경우
    if (!username) {
      return new Response(
        JSON.stringify({ error: "사용자 이름이 필요합니다" }),
        { status: 400 }
      );
    }

    // 사용자 이름으로 기록을 필터링합니다
    const records = await prisma.tbl_records.findMany({
      where: { r_username: username },
    });

    return new Response(JSON.stringify(records), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("기록을 가져오는 중 오류 발생:", error);
    return new Response(
      JSON.stringify({ error: "기록을 가져오는 중 오류 발생" }),
      { status: 500 }
    );
  }
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
