"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
const MainNav = () => {
  const { data: session } = useSession();

  return (
    <ul className="nav">
      {session?.user ? (
        <li className="button">
          <Link href="#" onClick={() => signOut()}>
            로그아웃({session?.user.name}님)
          </Link>
        </li>
      ) : (
        <>
          <li className="button">
            <Link href="/api/auth/signin">로그인</Link>
          </li>

          <li className="button">
            <Link href="/users/join">회원가입</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default MainNav;
