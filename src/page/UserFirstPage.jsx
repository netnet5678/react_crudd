import { useState, useEffect } from "react";
import { db } from "../libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../libs/firebase";

function SearchTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      <div className="max-w-6xl mx-auto mt-4 flex justify-end">
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
              <th className="border px-4 py-2 text-center">Company</th>
              <th className="border px-4 py-2 text-center">Name</th>
              <th className="border px-4 py-2 text-center">Code</th>
              <th className="border px-4 py-2 text-center">Phone</th>
              <th className="border px-4 py-2 text-center">Anydesk</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
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
                  colSpan={5}
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
