import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../libs/firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const role = userDoc.data()?.role;

      if (!userDoc.exists()) {
        setError("ไม่พบข้อมูลผู้ใช้ในฐานข้อมูล");
        return;
      }

      if (role === "admin") navigate("/Home");
      else if (role === "user") navigate("/UserFirstPage");
      else setError("ไม่สามารถระบุบทบาทผู้ใช้ได้");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          ref={passwordRef}
          required
        />

        <button className="bg-[#4CAF4F] text-white w-full py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
