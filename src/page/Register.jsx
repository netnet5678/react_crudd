import { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../libs/firebase";

export default function RegisterForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // เคลียร์ error เก่าก่อน
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // เก็บข้อมูล role ลง Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role: "user",
      });
      alert("Register success!");
      navigate("/login"); // หรือจะพาไปหน้าอื่นก็ได้
    } catch (err) {
      // จับ error เฉพาะกรณี email ซ้ำ
      if (err.code === "auth/email-already-in-use") {
        setError("อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้เมลอื่นหรือล็อกอินแทน");
      } else if (err.code === "auth/invalid-email") {
        setError("อีเมลไม่ถูกต้อง กรุณากรอกอีเมลให้ถูกต้อง");
      } else if (err.code === "auth/weak-password") {
        setError("รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            type="email"
            ref={emailRef}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            type="password"
            ref={passwordRef}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Register
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
