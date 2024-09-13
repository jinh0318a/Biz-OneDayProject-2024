import { userCreate } from "@/app/api/user";
import { redirect } from "next/navigation";

const inputTags = {
  username: "username",
  password: "password",
  realname: "realname",
  email: "email",
};

const JoinPage = () => {
  const createUser = async (formData) => {
    "use server";
    const rawFormData = {
      username: formData.get(inputTags.username),
      password: formData.get(inputTags.password),
      realname: formData.get(inputTags.realname),
      email: formData.get(inputTags.email),
    };
    await userCreate(rawFormData);
    redirect("/");
  };

  return (
    <form action={createUser} method="POST" className="join">
      <h1>회원가입</h1>
      <div>
        <input placeholder="USERNAME" type="text" name={inputTags.username} />
      </div>
      <div>
        <input
          placeholder="PASSWORD"
          type="password"
          autoComplete="false"
          name={inputTags.password}
        />
      </div>
      <div>
        <input placeholder="RE_PASSWORD" type="password" autoComplete="false" />
      </div>
      <div>
        <input placeholder="실제이름" type="text" name={inputTags.realname} />
      </div>

      <div>
        <input placeholder="이메일" type="email" name={inputTags.email} />
      </div>
      <div>
        <input type="submit" value="회원가입" />
      </div>
    </form>
  );
};

export default JoinPage;
