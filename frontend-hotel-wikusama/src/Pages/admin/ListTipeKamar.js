import axios from "axios";
import React, { useEffect, useState } from "react";
import TipeKamar from "./TipeKamar";

const ListTipeKamar = () => {
  const [tipeKamars, setTipeKamar] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getTipeKamar = async () => {
    try {
      let response = await axios.get("http://localhost:8080/hotel/tipe_kamar");
      console.log(response);
      setTipeKamar(response.data.tipe_kamar);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getTipeKamar();
  }, []);

  return (
    <div className="py-5">
      <div className="justify-center flex items-center">
        <div className="p-5 rounded border shadow-md">
          <h1 className="text-xl font-bold mb-3">Daftar Tipe Kamar</h1>
          <button className="bg-green-300 px-5 mb-3 rounded text-green-600 hover:text-white"
          onClick={() => setShowModal(true)}>tambah +</button>
          {showModal && <TipeKamar onClose={() => setShowModal(false)}/>}
        <table className="table table-fixed rounded">
              <thead >
                <tr className="bg-gray-100">
                  <th className="border px-4 py-3">Nama Tipe</th>
                  <th className="border px-4 py-3">Harga</th>
                  <th className="border px-4 py-3">Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {
                tipeKamars.map(tipeKamar => {
                    return (
                        <tr key={tipeKamar.id_tipe_kamar}>
                            <td className="border px-4 py-3">{tipeKamar.nama_tipe_kamar}</td>
                            <td className="border px-4 py-3">{tipeKamar.harga}</td>
                            <td className="border px-4 py-3">{tipeKamar.deskripsi}</td>
                        </tr>
                    )
                })
                }
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ListTipeKamar;
