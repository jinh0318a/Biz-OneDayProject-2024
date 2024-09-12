"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const MainPage = () => {
  const { data: session } = useSession(); // 세션 정보 가져오기
  const [form, setForm] = useState({
    r_div: "",
    r_start: "",
    r_end: "",
    r_dis: "",
    r_cost: "",
    r_place: "",
    r_username: session?.user.username || "", // 세션에서 사용자 이름 가져오기
  });

  console.log(session?.user.username);

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

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
    await fetch("/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    setForm({
      r_div: "",
      r_start: "",
      r_end: "",
      r_dis: "",
      r_cost: "",
      r_place: "",
      r_username: session?.user?.username || "",
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

  const handleUpdate = async (r_no, updateData) => {
    await fetch("/api/records", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ r_no, updateData }),
    });
    fetchRecords();
  };

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

        <button type="submit">추가</button>
      </form>
      <ul className="record">
        <li>구분 - 시작일시 - 종료일시 - 현재거리 - 소요비용 - 장소</li>
        {records.map((record) => (
          <>
            <li key={record.r_no}>
              {record.r_div} - {record.r_start} - {record.r_end} -{" "}
              {record.r_dis} - {record.r_cost} - {record.r_place} -{" "}
              {record.r_username}
              <button onClick={() => handleDelete(record.r_no)}>삭제</button>
              <button
                onClick={() =>
                  handleUpdate(record.r_no, { r_end: "updated_value" })
                }
              >
                수정
              </button>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
