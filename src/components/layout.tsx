import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Layout() {
  const navigate = useNavigate();

  const logOut = () => {
    //로그아웃 로직
    auth.signOut();
    navigate("/");

    // 로그아웃 후 페이지 새로고침
    window.location.reload();
  };
  return (
    <>
      <h2>
        <button onClick={logOut}>로그아웃</button>
      </h2>
      {/* Outlet children 
          / 이후 url에 따라 바뀜*/}
      <Outlet />
    </>
  );
}
