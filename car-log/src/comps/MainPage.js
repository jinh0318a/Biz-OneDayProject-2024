"use client";
import { useSession } from "next-auth/react";

const MainPage = () => {
  return (
    <>
      <form>
        <div>
          <input placeholder="구분" name="log_div" type="text" />
        </div>
        <div>
          <input placeholder="시작일시" name="log_start" type="text" />
        </div>
        <div>
          <input placeholder="종료일시" name="log_end" type="text" />
        </div>
        <div>
          <input placeholder="현재거리" name="log_dis" type="number" />
        </div>
        <div>
          <input placeholder="소요비용" name="log_cost" type="number" />
        </div>
        <div>
          <input placeholder="장소" name="log_place" type="text" />
        </div>
      </form>
      <ul></ul>
    </>
  );
};

export default MainPage;
