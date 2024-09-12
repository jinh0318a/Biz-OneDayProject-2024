"use client";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
const LoginPage = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const onLoginHandler = useCallback(async () => {
    await signIn("Credentials", {
      username: user.username,
      password: user.password,
      redirect: true,
      callbackUrl: "/",
    });
  }, [user]);

  return (
    <form>
      <fieldset>
        <legend>로그인</legend>
        <input
          name="username"
          type="text"
          placeholder="아이디를 입력하세요"
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <input type="button" value="로그인" onClick={onLoginHandler} />
      </fieldset>
    </form>
  );
};
export default LoginPage;
