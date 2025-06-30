import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h2>layout</h2>
      {/* Outlet children 
          / 이후 url에 따라 바뀜*/}
      <Outlet />
    </>
  );
}
