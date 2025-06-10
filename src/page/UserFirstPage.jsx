import { useState, useEffect } from "react";
import { db } from "../libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../libs/firebase";
import Logo from "../assets/img/logo-black.png";
import { Link } from "react-router-dom";

function SearchTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // สถานะสำหรับจัดเรียง: คอลัมน์ที่จัดเรียงและทิศทาง ('asc' หรือ 'desc')
  // กำหนดค่าเริ่มต้นให้เรียงตาม 'company' จากน้อยไปมากทันทีที่โหลด
  const [sortConfig, setSortConfig] = useState({ key: "code", direction: "asc" });

  const userRef = collection(db, "data");

  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    });

    return () => unsubscribe();
  }, []);

  // กรองข้อมูลตาม searchTerm (search ใน company, name, code, phone, anydesk)
  const filteredData = data.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.company?.toLowerCase().includes(search) ||
      item.name?.toLowerCase().includes(search) ||
      item.code?.toLowerCase().includes(search) ||
      item.phone?.toLowerCase().includes(search) ||
      item.anydesk?.toLowerCase().includes(search)
    );
  });

  // ใช้การจัดเรียงกับข้อมูลที่กรองแล้ว
  const sortedData = [...filteredData].sort((a, b) => {
    // ถ้ายังไม่มีการกำหนดคอลัมน์ที่จะจัดเรียง (กรณี sortConfig.key เป็น null)
    // หรือถ้ามีการกำหนดแล้ว ให้ทำการจัดเรียง
    if (sortConfig.key === null) {
      return 0; // ไม่เรียงลำดับ (แต่ตอนนี้เรากำหนด key เริ่มต้นแล้ว จึงไม่ควรเข้าเงื่อนไขนี้)
    }

    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";

    // เปรียบเทียบค่าเพื่อจัดเรียง
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // ฟังก์ชันสำหรับจัดการเมื่อคลิกที่หัวตาราง
  const requestSort = (key) => {
    let direction = "asc";
    // ถ้าคลิกคอลัมน์เดิม
    if (sortConfig.key === key) {
      // ถ้าตอนนี้เรียงจากน้อยไปมาก ให้เปลี่ยนเป็นมากไปน้อย (คลิกครั้งแรกหลังจากโหลด)
      if (sortConfig.direction === "asc") {
        direction = "desc";
      }
      // ถ้าตอนนี้เรียงจากมากไปน้อย ให้เปลี่ยนกลับเป็นน้อยไปมาก (คลิกครั้งถัดไป)
      else {
        direction = "asc";
      }
    }
    // ถ้าคลิกคอลัมน์ใหม่ ให้เริ่มต้นเรียงจากน้อยไปมาก
    // (แต่โจทย์ของคุณคือ "คลิกครั้งแรกมากไปน้อย" ดังนั้นตรงนี้จะเปลี่ยน Logic เล็กน้อย)
    // ตามโจทย์ใหม่: ถ้าคลิกคอลัมน์ใหม่ ให้เริ่มต้นเรียงจากมากไปน้อยเลย
    if (sortConfig.key !== key) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <div className="max-w-6xl mx-auto mt-4 flex justify-between items-center">
        {/* โลโก้ - ชิดซ้าย */}
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* ปุ่ม Logout - ชิดขวา */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">ค้นหาข้อมูลผู้ใช้</h2>

      <input
        type="text"
        placeholder="ค้นหา Company, Name, Code, Phone หรือ Anydesk..."
        className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="border px-4 py-2 text-center cursor-pointer"
                onClick={() => requestSort("company")}
              >
                Company
                {/* แสดงไอคอนลูกศรบอกทิศทางการเรียง */}
                {sortConfig.key === "company" &&
                  (sortConfig.direction === "asc" ? " ⬆️" : " ⬇️")}
              </th>
              <th
                className="border px-4 py-2 text-center cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? " ⬆️" : " ⬇️")}
              </th>
              <th
                className="border px-4 py-2 text-center cursor-pointer"
                onClick={() => requestSort("code")}
              >
                Code
                {sortConfig.key === "code" &&
                  (sortConfig.direction === "asc" ? " ⬆️" : " ⬇️")}
              </th>
              <th
                className="border px-4 py-2 text-center cursor-pointer"
                onClick={() => requestSort("phone")}
              >
                Phone
                {sortConfig.key === "phone" &&
                  (sortConfig.direction === "asc" ? " ⬆️" : " ⬇️")}
              </th>
              <th
                className="border px-4 py-2 text-center cursor-pointer"
                onClick={() => requestSort("anydesk")}
              >
                Anydesk
                {sortConfig.key === "anydesk" &&
                  (sortConfig.direction === "asc" ? " ⬆️" : " ⬇️")}
              </th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* แสดงข้อมูลที่จัดเรียงแล้ว */}
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">
                    {item.company}
                  </td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2 text-center">{item.code}</td>
                  <td className="border px-4 py-2 text-center">{item.phone}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.anydesk}
                  </td>
                  <td className="border px-4 py-2 text-center whitespace-nowrap">
                    <button
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-green-600 mb-1 md:mb-0 mr-2"
                      onClick={() =>
                        window.open(`anydesk:${item.anydesk}`, "_self")
                      }
                    >
                      Anydesk
                    </button>

                    <button
                      onClick={() => window.open(`tel:${item.tel}`, "_self")}
                      className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 mb-1 md:mb-0 mr-2"
                    >
                      Tel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="border px-4 py-2 text-center text-gray-500"
                >
                  ไม่พบข้อมูลที่ค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchTable;