import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import EditStatus from "./EditStatus";

const ListPemesanan = () => {
  const [pemesanans, setPemesanans] = useState([]);
  const [email, setEmail] = useState({ data: "" });
  const [tgl_check_in, setTglCheckIn] = useState({ data: "" });
  const [showModal, setShowModal] = useState(false);
  const [id_pemesanan, setIdPemesanan] = useState(null);

  const getPemesanan = async () => {
    try {
      let response = await axios.get("http://localhost:8080/hotel/pemesanan");
      setPemesanans(response.data.pemesanan);
    } catch (e) {
      console.log(e.message);
    }
  };
  const getPemesananEmail = async (e) => {
    e.preventDefault();
    if (email) {
      console.log(email.data);
      try {
        let response = await axios.post(
          "http://localhost:8080/hotel/pemesanan/email",
          {
            email: email.data,
          }
        );
        setPemesanans(response.data.pemesanan);
        console.log(response);
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  const getPemesananCheckin = async (e) => {
    e.preventDefault();
    if (tgl_check_in) {
      console.log(tgl_check_in.data);
      try {
        let response = await axios.post(
          "http://localhost:8080/hotel/pemesanan/checkin",
          {
            tgl_check_in: tgl_check_in.data,
          }
        );
        setPemesanans(response.data.pemesanan);
        console.log(response);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const handleEdit = (id_pemesanan) => {
    setIdPemesanan(id_pemesanan);
    setShowModal(true);
  };

  const handleDelete = async (id_pemesanan) => {
    try {
      let response = await axios.get("http://localhost:8080/hotel/pemesanan/" + id_pemesanan);
      console.log('delete successful')
    } catch (e) {
      console.log(e.message);
    }
  };
  const options = { day: 'numeric', month: 'long', year: 'numeric',   };
  const locale = (tgl_check_in) => {
    const date = new Date(tgl_check_in)
    const check_in = date.toLocaleDateString('id-ID', options);
    return check_in
  }

  useEffect(() => {
    getPemesanan();
  }, []);
  var column = "flex flex-wrap -mx-3 mb-3";
  return (
    <div className="py-5">
      {showModal && (
                <EditStatus
                  id_pemesanan={id_pemesanan}
                  onClose={() => setShowModal(false)}
                />
              )}
      <div className="justify-center flex items-center">
        <div className="p-5 rounded border shadow-md">
          <h1 className="text-xl font-bold mb-3">Daftar Pemesanan</h1>
          <div className="flex justify-start">
            {/* search */}
            <div className="mb-3 xl:w-96 ">
              <div className="relative mb-4 flex w-full pl-4 flex-wrap items-stretch">
                <div className={column}>
                  <input
                    className="appearance-none block bg-gray-200 text-gray-700 border rounded
                py-1.5 px-6  leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Email Pemesan"
                    onChange={(ev) => setEmail({ data: ev.target.value })}
                  />
                  <button
                    className="relative flex items-center rounded-r bg-primary px-6 py-1.5 text-xs font-medium uppercase leading-tight bg-blue-500
                  text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    onClick={getPemesananEmail}
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Check In */}
            <div className="mb-3 xl:w-96 ">
              <div className="relative mb-4 flex pl-4 flex-wrap items-stretch">
                {/* Check In*/}
                <div className={column}>
                  <input
                    className="appearance-none block bg-gray-200 text-gray-700 border rounded
                py-1.5 px-6  leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="date"
                    placeholder="Tanggal Check In"
                    onChange={(ev) => setTglCheckIn({ data: ev.target.value })}
                  />
                  <button
                    className="relative flex items-center rounded-r bg-primary px-6 py-1.5 text-xs font-medium uppercase leading-tight bg-blue-500
                  text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    onClick={getPemesananCheckin}
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* table */}
          <table className="table-fixed rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID </th>
                <th className="border px-4 py-2">Nama Tamu</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Tgl Check In</th>
                <th className="border px-4 py-2">Tgl Check Out</th>
                <th className="border px-4 py-2">Tipe Kamar</th>
                <th className="border px-4 py-2">Total Kamar</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pemesanans.map((pemesanan) => {
                return (
                  <Fragment>
                    <tr key={pemesanan.id_pemesanan}>
                      <td className="border px-4 py-2">
                        {pemesanan.id_pemesanan}
                      </td>
                      <td className="border px-4 py-2">
                        {pemesanan.nama_tamu}
                      </td>
                      <td className="border px-4 py-2">
                        {pemesanan.email_pemesan}
                      </td>
                      <td className="border px-4 py-2">
                        {pemesanan.status_pemesanan}
                      </td>
                      <td className="border px-4 py-2">
                      {locale(pemesanan.tgl_check_in)}
                      </td>
                      <td className="border px-4 py-2">
                      {locale(pemesanan.tgl_check_out)}
                      </td>
                      <td className="border px-4 py-2 text-center">
                      {pemesanan.id_tipe_kamar}                        
                      </td>
                      <td className="border px-4 py-2 text-center">
                      {pemesanan.jumlah_kamar}                        
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-yellow-300 px-5 mx-3 rounded text-yellow-600 hover:text-white"
                          onClick={() => handleEdit(pemesanan.id_pemesanan)}
                        >
                          Edit
                        </button>

                        <button className="bg-red-300 px-5 mx-3 rounded text-red-600 hover:text-white"
                        onClick={() => handleDelete(pemesanan.id_pemesanan)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListPemesanan;
