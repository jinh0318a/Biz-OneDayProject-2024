"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
const MainNav = () => {
  const { data: session } = useSession();

  return (
    <ul>
      {session?.user ? (
        <li>
          <Link href="#" onClick={() => signOut()}>
            로그아웃({session?.user.email})
          </Link>
        </li>
      ) : (
        <>
          <li>
            <Link href="/api/auth/signin">로그인</Link>
          </li>
          <li>
            <Link href="/users/join">회원가입</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default MainNav;
