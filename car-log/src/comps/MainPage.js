"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const formatDateTime = (dateTime) => {
  if (!dateTime) return "";
  return dateTime.replace("T", " ");
};

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
    r_username: "",
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
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    const requestData = {
      r_div: form.r_div,
      r_start: form.r_start,
      r_end: form.r_end,
      r_dis: Number(form.r_dis) || 0,
      r_cost: Number(form.r_cost) || 0,
      r_place: form.r_place,
      r_username: session.user.name,
    };

    if (form.r_no) {
      // Update request
      await fetch("/api/records", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          r_no: form.r_no,
          updateData: requestData,
        }),
      });
    } else {
      // Create request
      await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
    }

    // Reset form and fetch records again
    setForm({
      r_div: "",
      r_start: "",
      r_end: "",
      r_dis: "",
      r_cost: "",
      r_place: "",
      r_no: null,
      r_username: session.user.name || "",
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
    return <div className="load">로딩 중...</div>; // 세션 로딩 중일 때 로딩 상태 표시
  }

  if (!session) {
    return (
      <div class="login">
        <Link href="/api/auth/signin" className="login">
          로그인
        </Link>
        이 필요합니다
      </div>
    ); // 세션이 없을 때
  }

  return (
    <>
      <section className="main">
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
              placeholder="현재거리(km)"
              name="r_dis"
              type="text"
              value={form.r_dis}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              placeholder="소요비용(원)"
              name="r_cost"
              type="text"
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
          <li>
            <span>구분</span> <span className="date">시작일시</span>
            <span className="date">종료일시</span> <span>현재거리</span>
            <span>소요비용</span> <span>장소</span>
            <button className="hidden"></button>
            <button className="hidden"></button>
          </li>
          {records.map((record) => (
            <li key={record.r_no}>
              <span>{record.r_div}</span>
              <span className="date">{formatDateTime(record.r_start)}</span>
              <span className="date">{formatDateTime(record.r_end)}</span>
              <span>{record.r_dis ? `${record.r_dis}km` : ""}</span>
              <span>{record.r_cost ? `${record.r_cost}원` : ""}</span>
              <span>{record.r_place}</span>
              <button onClick={() => handleDelete(record.r_no)}>삭제</button>
              <button onClick={() => handleUpdate(record)}>수정</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default MainPage;
