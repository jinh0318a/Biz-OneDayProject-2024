"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const MainPage = () => {
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    r_div: "",
    r_start: "",
    r_end: "",
    r_dis: "",
    r_cost: "",
    r_place: "",
    r_no: null,
    r_username: "", // 초기값은 빈 문자열
  });

  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (session) {
      setForm((prev) => ({ ...prev, r_username: session.user.name }));
      fetchRecords(session.user.name);
    }
  }, [session]);

  const fetchRecords = async (username) => {
    try {
      const encodedUsername = encodeURIComponent(username);
      const res = await fetch(`/api/records?username=${encodedUsername}`);
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.error("Failed to fetch records:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return; // 세션이 없으면 요청하지 않음

    if (form.r_no) {
      // Update request
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
            r_username: session.user.name, // 사용자 이름 포함
          },
        }),
      });
    } else {
      // Create request
      await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          r_username: session.user.name, // 사용자 이름 포함
        }),
      });
    }
    // 폼 초기화 및 기록 다시 가져오기
    setForm({
      r_div: "",
      r_start: "",
      r_end: "",
      r_dis: "",
      r_cost: "",
      r_place: "",
      r_no: null,
      r_username: session.user.name || "", // 사용자 이름 설정
    });
    fetchRecords(session?.user.name);
  };

  const handleDelete = async (r_no) => {
    if (!session) return; // 세션이 없으면 요청하지 않음

    await fetch("/api/records", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ r_no }),
    });
    fetchRecords(session?.user.name);
  };

  const handleUpdate = (record) => {
    setForm({
      r_div: record.r_div,
      r_start: record.r_start,
      r_end: record.r_end,
      r_dis: record.r_dis,
      r_cost: record.r_cost,
      r_place: record.r_place,
      r_no: record.r_no, // 편집할 기록의 ID
      r_username: record.r_username, // 사용자 이름 설정
    });
  };

  if (status === "loading") {
    return <div>로딩 중...</div>; // 세션 로딩 중일 때 로딩 상태 표시
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
            type="datetime-local"
            value={form.r_start}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="종료일시"
            name="r_end"
            type="datetime-local"
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

        <button type="submit" className="form button">
          {form.r_no ? "수정" : "추가"}
        </button>
      </form>
      <ul className="record">
        <li>구분 - 시작일시 - 종료일시 - 현재거리 - 소요비용 - 장소</li>
        {records.map((record) => (
          <li key={record.r_no}>
            <span>{record.r_div}</span> - <span>{record.r_start}</span> -
            <span>{record.r_end}</span> - <span>{record.r_dis}</span> -
            <span>{record.r_cost}</span> - <span>{record.r_place}</span>
            <button onClick={() => handleDelete(record.r_no)}>삭제</button>
            <button onClick={() => handleUpdate(record)}>수정</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
