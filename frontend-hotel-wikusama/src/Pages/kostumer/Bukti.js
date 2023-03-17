import axios from "axios";
import React, { useEffect, useState } from "react";

const Bukti = () => {
  const [buktiPemesanan, setBuktiPemesanan] = useState([]);
  const email = localStorage.getItem("email_pemesan");
  const getBukti = async () => {
    try {
      let response = await axios.post(
        "http://localhost:8080/hotel/pemesanan/email",
        {
          email: email,
        }
      );
      setBuktiPemesanan(response.data.pemesanan);
      console.log(response.data.pemesanan);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getBukti();
  }, []);
  const options = { day: 'numeric', month: 'long', year: 'numeric',   };
  const locale = (tgl_check_in) => {
    const date = new Date(tgl_check_in)
    const check_in = date.toLocaleDateString('id-ID', options);
    return check_in
  }
  return (
    <div className='py-5'>
          <div className='justify-center flex items-center'>
            <div className='p-5 rounded border shadow-md'>
              <h1 className='text-xl font-bold mb-3'>Daftar bukti</h1>
              <table className='table-fixed rounded'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border px-4 py-2'>ID </th>
                    <th className='border px-4 py-2'>Nama Pemesan</th>
                    <th className='border px-4 py-2'>Email Pemesan</th>
                    <th className='border px-4 py-2'>Check In</th>
                    <th className='border px-4 py-2'>Check Out</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    buktiPemesanan.map((bukti) => {
                      return (
                        <tr key={bukti.id_bukti} >
                          <td className='border px-4 py-2'>{bukti.id_pemesanan}</td>
                          <td className='border px-4 py-2'>{bukti.nama_pemesan}</td>
                          <td className='border px-4 py-2'>{bukti.email_pemesan}</td>
                          <td className='border px-4 py-2'>{locale(bukti.tgl_check_in)}</td>
                          <td className='border px-4 py-2'>{locale(bukti.tgl_check_out)}</td>
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

export default Bukti;
