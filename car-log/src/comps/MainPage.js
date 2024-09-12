"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const MainPage = () => {
  const { data: session, status } = useSession(); // 세션 정보와 상태 가져오기

  const [form, setForm] = useState({
    r_div: "",
    r_start: "",
    r_end: "",
    r_dis: "",
    r_cost: "",
    r_place: "",
    r_no: null, // 수정할 레코드의 ID
  });

  const [records, setRecords] = useState([]);

  // 컴포넌트 마운트 시 레코드를 가져옵니다.
  useEffect(() => {
    fetchRecords();
  }, []);

  // 세션 상태에 따라 추가 작업이 필요한 경우 여기에 작성
  useEffect(() => {
    if (status === "authenticated" && session) {
      // 세션이 인증되었을 때 추가 작업이 필요하다면 여기에 작성
    }
  }, [session, status]);

  const fetchRecords = async () => {
    const res = await fetch("/api/records");
    const data = await res.json();
    setRecords(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.r_no) {
      // 수정 요청
      await fetch("/api/records", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          r_no: form.r_no,
          updateData: {
            r_div: form.r_div,
            r_start: form.r_start,
            r_end: form.r_end,
            r_dis: form.r_dis,
            r_cost: form.r_cost,
            r_place: form.r_place,
          },
        }),
      });
    } else {
      // 추가 요청
      await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    }
    // 폼 리셋 및 레코드 다시 가져오기
    setForm({
      r_div: "",
      r_start: "",
      r_end: "",
      r_dis: "",
      r_cost: "",
      r_place: "",
      r_no: null,
    });
    fetchRecords();
  };

  const handleDelete = async (r_no) => {
    await fetch("/api/records", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ r_no }),
    });
    fetchRecords();
  };

  const handleUpdate = (record) => {
    setForm({
      r_div: record.r_div,
      r_start: record.r_start,
      r_end: record.r_end,
      r_dis: record.r_dis,
      r_cost: record.r_cost,
      r_place: record.r_place,
      r_no: record.r_no, // 수정할 레코드의 ID를 저장
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>; // 세션 로딩 중일 때 로딩 상태 표시
  }

  if (!session) {
    return <div>로그인이 필요합니다.</div>; // 세션이 없을 때
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="main form">
        <div>
          <input
            placeholder="구분"
            name="r_div"
            type="text"
            value={form.r_div}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="시작일시"
            name="r_start"
            type="text"
            value={form.r_start}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="종료일시"
            name="r_end"
            type="text"
            value={form.r_end}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="현재거리"
            name="r_dis"
            type="number"
            value={form.r_dis}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="소요비용"
            name="r_cost"
            type="number"
            value={form.r_cost}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="장소"
            name="r_place"
            type="text"
            value={form.r_place}
            onChange={handleChange}
          />
        </div>

        <button type="submit">{form.r_no ? "수정" : "추가"}</button>
      </form>
      <ul className="record">
        <li>구분 - 시작일시 - 종료일시 - 현재거리 - 소요비용 - 장소</li>
        {records.map((record) => (
          <li key={record.r_no}>
            {record.r_div} - {record.r_start} - {record.r_end} - {record.r_dis}{" "}
            - {record.r_cost} - {record.r_place}
            <button onClick={() => handleDelete(record.r_no)}>삭제</button>
            <button onClick={() => handleUpdate(record)}>수정</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
