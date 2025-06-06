import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase"; // ปรับให้ตรงกับที่คุณ import firebase ในโปรเจกต์ของคุณ

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // ระหว่างรอโหลดสถานะ user
    return <div>Loading...</div>;
  }

  if (!user) {
    // ถ้าไม่มี user ให้ไปหน้า login
    return <Navigate to="/login" replace />;
  }

  // ถ้ามี user ให้เข้าถึงหน้า children ได้
  return children;
}
