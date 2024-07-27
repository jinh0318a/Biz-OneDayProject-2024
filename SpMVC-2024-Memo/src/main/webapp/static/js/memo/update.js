document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.memo.update");

  form?.addEventListener("submit", (event) => {
    const inputTitle = document.querySelector("#m_title");
    const inputMemo = document.querySelector("#m_memo");

    const title = inputTitle.value.trim();
    const memo = inputMemo.value.trim();

    const MAX_TITLE_LENGTH = 40;
    const MAX_MEMO_LENGTH = 400;

    const getByteLength = (str) => new TextEncoder().encode(str).length;

    if (!title) {
      alert("제목을 입력해주세요.");
      inputTitle.focus();
      event.preventDefault();
      return false;
    }

    if (getByteLength(title) > MAX_TITLE_LENGTH) {
      alert(`제목은 ${MAX_TITLE_LENGTH}자 이하로 입력해주세요.`);
      inputTitle.focus();
      event.preventDefault();
      return false;
    }

    if (!memo) {
      alert("내용을 입력해주세요.");
      inputMemo.focus();
      event.preventDefault();
      return false;
    }

    if (getByteLength(memo) > MAX_MEMO_LENGTH) {
      alert(`내용은 ${MAX_MEMO_LENGTH}자 이하로 입력해주세요.`);
      inputMemo.focus();
      event.preventDefault();
      return false;
    }

    return true;
  });
});
