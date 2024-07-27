document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.memo.insert");

  const getByteLength = (str) => new TextEncoder().encode(str).length;

  form.addEventListener("submit", (event) => {
    const input_title = document.querySelector("#m_title");
    const input_memo = document.querySelector("#m_memo");

    const title = input_title.value.trim();
    const memo = input_memo.value.trim();

    const MAX_TITLE_LENGTH = 40;
    const MAX_MEMO_LENGTH = 400;

    if (!title) {
      alert("제목을 입력해주세요.");
      input_title.focus();
      event.preventDefault();
      return false;
    }

    if (getByteLength(title) > MAX_TITLE_LENGTH) {
      alert(`제목은 ${MAX_TITLE_LENGTH}자 이하로 입력해주세요.`);
      input_title.focus();
      event.preventDefault();
      return false;
    }

    if (!memo) {
      alert("내용을 입력해주세요.");
      input_memo.focus();
      event.preventDefault();
      return false;
    }

    if (getByteLength(memo) > MAX_MEMO_LENGTH) {
      alert(`내용은 ${MAX_MEMO_LENGTH}자 이하로 입력해주세요.`);
      input_memo.focus();
      event.preventDefault();
      return false;
    }

    return true;
  });
});
