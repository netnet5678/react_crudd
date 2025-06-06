// import React from 'react'
import { db } from "../libs/firebase";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../libs/firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function Table() {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  const userRef = collection(db, "data");
  const [editID, setEditID] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("Text");

    // แยกข้อมูลด้วย tab หรือเว้นวรรคอย่างน้อย 2 ช่อง
    const parts = text.trim().split(/\t| {2,}/);

    if (parts.length >= 5) {
      setFormData({
        company: parts[0],
        name: parts[1],
        code: parts[2],
        phone: parts[3],
        anydesk: parts[4],
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const loadRealtimeData = () =>
    onSnapshot(userRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    });

  useEffect(() => {
    const unsubscribe = loadRealtimeData();
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddData = async () => {
    await addDoc(userRef, formData);
    try {
      console.log("Data added successfully");
    } catch (error) {
      console.error("Error adding data: ", error);
    }
    setIsClicked(true);
      setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(userRef, id));
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleSave = async (id) => {
    try {
      await updateDoc(doc(userRef, id), formData);
      setEditID(null);
      setFormData({});
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleCancel = () => {
    setEditID(null);
    setFormData({});
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="max-w-6xl mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          เพิ่มข้อมูลผู้ใช้
        </h2>

        <div className="max-w-6xl mx-auto p-4 bg-white rounded shadow mt-4">
          <label className="block text-gray-700 font-medium mb-1">
            วางข้อมูล Excel (แยกด้วย tab หรือ space)
          </label>
          <input
            type="text"
            onPaste={handlePaste}
            placeholder="วางข้อมูล: เช่น D7	True Shop Big C Huamark	70001	0641804477	1768356964"
            className="w-full border border-blue-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="company"
              className="block text-gray-700 font-medium mb-1"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น D7"
              value={formData.company ?? ""}
              onChange={handleSubmit}
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น True Shop Big C Huamark"
              value={formData.name ?? ""}
              onChange={handleSubmit}
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="code"
              className="block text-gray-700 font-medium mb-1"
            >
              Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น 70001"
              value={formData.code ?? ""}
              onChange={handleSubmit}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น 084 180 4477"
              value={formData.phone ?? ""}
              onChange={handleSubmit}
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="anydesk"
              className="block text-gray-700 font-medium mb-1"
            >
              Anydesk
            </label>
            <input
              type="text"
              id="anydesk"
              name="anydesk"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น 1768356964"
              value={formData.anydesk ?? ""}
              onChange={handleSubmit}
            />
          </div>
        </div>

        <button
          onClick={handleAddData}
          className={`w-full py-2 px-4 rounded transition duration-300 ${
            isClicked ? "bg-green-600" : "bg-blue-500 hover:bg-red-600"
          } text-white`}
        >
          บันทึกข้อมูล
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-10 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">ตารางข้อมูล (Static)</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-center">Company</th>
                <th className="border px-4 py-2 text-center">Name</th>
                <th className="border px-4 py-2 text-center">Code</th>
                <th className="border px-4 py-2 text-center">Phone</th>
                <th className="border px-4 py-2 text-center">Anydesk</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">
                    {editID === item.id ? (
                      <input
                        type="text"
                        name="company"
                        className="border p-2 rounded w-full"
                        value={formData.company ?? item.company}
                        onChange={handleSubmit}
                      />
                    ) : (
                      item.company
                    )}
                  </td>

                  <td className="border px-4 py-2">
                    {editID === item.id ? (
                      <input
                        type="text"
                        name="name"
                        className="border p-2 rounded w-full"
                        value={formData.name ?? item.name}
                        onChange={handleSubmit}
                      />
                    ) : (
                      item.name
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editID === item.id ? (
                      <input
                        type="text"
                        name="code"
                        className="border p-2 rounded w-full"
                        value={formData.code ?? item.code}
                        onChange={handleSubmit}
                      />
                    ) : (
                      item.code
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editID === item.id ? (
                      <input
                        type="phone"
                        name="phone"
                        className="border p-2 rounded w-full"
                        value={formData.phone ?? item.phone}
                        onChange={handleSubmit}
                      />
                    ) : (
                      item.phone
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editID === item.id ? (
                      <input
                        type="text"
                        name="anydesk"
                        className="border p-2 rounded w-full"
                        value={formData.anydesk ?? item.anydesk}
                        onChange={handleSubmit}
                      />
                    ) : (
                      item.anydesk
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center whitespace-nowrap">
                    {editID === item.id ? (
                      <>
                        <button
                          onClick={() => handleSave(item.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-1 md:mb-0 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-green-600 mb-1 md:mb-0 mr-2"
                          onClick={() =>
                            window.open(`anydesk:${item.anydesk}`, "_self")
                          }
                        >
                          Anydesk
                        </button>

                        <button
                          onClick={() =>
                            window.open(`tel:${item.tel}`, "_self")
                          }
                          className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 mb-1 md:mb-0 mr-2"
                        >
                          Tel
                        </button>

                        <button
                          onClick={() => setEditID(item.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-1 md:mb-0 mr-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Table;
