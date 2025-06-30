// 웹 앱에 Firebase 추가 >> Firebase SDK 추가, 복붙
// Firebase 초기

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABtFfFJhrCufYxYQLnzlehFibkOf9BEz0",
  authDomain: "nwitter-reloaded-317f4.firebaseapp.com",
  projectId: "nwitter-reloaded-317f4",
  storageBucket: "nwitter-reloaded-317f4.firebasestorage.app",
  messagingSenderId: "962918291490",
  appId: "1:962918291490:web:fa5c1a907fc4a6ce79127b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 인증 가져오기
export const auth = getAuth(app);
