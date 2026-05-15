// Firebase 설정 파일
// 이 파일에 있는 키는 웹에 공개되어도 안전합니다 (Firestore 보안 규칙으로 보호)

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKS220zzaV27k73XwC8jYVKXac0-dewUw",
  authDomain: "class-sign-up.firebaseapp.com",
  projectId: "class-sign-up",
  storageBucket: "class-sign-up.firebasestorage.app",
  messagingSenderId: "662611300581",
  appId: "1:662611300581:web:a996e55ec7d9dbaca8840c",
  measurementId: "G-CW8QSWEW7R"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
