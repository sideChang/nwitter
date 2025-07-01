import type React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode; //children은 ProtectedRoute 컴포넌트의 모든 자식 요소
}) {
  const user = auth.currentUser;

  if (user === null) {
    // 사용자가 로그인하지 않은 경우
    // 로그인 페이지로 redirect
    return <Navigate to="/login" />;
  }

  return children;
}
