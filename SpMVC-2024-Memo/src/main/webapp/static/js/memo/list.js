document.addEventListener("DOMContentLoaded", () => {
  const btn_clock = document.querySelector("#clock");
  const memo_table = document.querySelector("table.memo.list");
  const memo_data = memo_table?.querySelector("tbody");

  const onDataClickHandler = (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const m_seq = tr.dataset.m_seq;

      document.location.href = `${rootPath}/detail?m_seq=${m_seq}`;
    }
  };

  onCurrentTime = () => {
    const now = new Date();
    const currentDate = now.toISOString().substring(0, 10);
    const currentTime = now.toISOString().slice(11, 16);

    const dateInput = document.querySelector("#date");
    const timeInput = document.querySelector("#time");
    const date = document.querySelector("#m_date");
    const time = document.querySelector("#m_time");

    dateInput.value = currentDate;
    timeInput.value = currentTime;
    date.value = currentDate;
    time.value = currentTime;

    const insert = document.querySelector("div.memo.insert");
    insert.style.visibility = "visible";
  };

  memo_data.addEventListener("click", onDataClickHandler);
  btn_clock.addEventListener("click", onCurrentTime);
});
