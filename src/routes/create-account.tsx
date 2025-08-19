import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Wrapper,
  Input,
  Form,
  Error,
  Switcher,
  Title,
} from "../components/auth-component";
import GithubButton from "../components/github-btn";

// 각 에러 상황마다 각자 메세지를 정의할 수 있지만,
// 여기서는 간단하게 에러 메시지를 설정하지 않고
// Firebase에서 제공하는 기본 에러 메시지를 사용합니다.
// 만약 에러 메시지를 사용자 친화적으로 만들고 싶다면,
// 아래와 같이 에러 메시지를 정의할 수 있습니다.

// const errors = {
//   "auth/email-already-in-use": "이미 사용중인 이메일입니다.",
// };

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // input 입력한 value >> state에 전달할 수 있음
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    {
      const {
        target: { name, value },
      } = e;
      if (name === "name") {
        setName(value);
      } else if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      }
    }
  };

  // 회원가입 로직
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, password);

    setError(""); // 에러 메시지 초기화

    // 로딩 중이거나 입력값이 비어있으면 함수 종료
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setIsLoading(true);
      // 계정생성
      // password는 6자리 이상이어야 함
      const creden = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 유저 name 설정
      await updateProfile(creden.user, {
        displayName: name,
      });
      // 홈페이지로 redirect
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        // 에러 메시지 설정
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={onChange}
          required
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={onChange}
          required
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={onChange}
          required
        />
        <Input type="submit" value={isLoading ? "loading..." : "회원가입"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 있으신가요?{""}
        <Link to="/login">로그인</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
