import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ListPemesanan = () => {
    const [pemesanans, setPemesanans] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getPemesanan = async ()=> {
        try {
            let response = await axios.get('http://localhost:8080/store/pemesanan')
            setPemesanans(response.data.pemesanan)
            console.log(response.data.pemesanan)
        } catch(e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getPemesanan();
    }, [])
  return (
    <div className='py-5'>
          <div className='justify-center flex items-center'>
            <div className='p-5 rounded border shadow-md'>
              <h1 className='text-xl font-bold mb-3'>Daftar Pemesanan</h1>
              <table className='table-fixed rounded'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border px-4 py-2'>ID </th>
                    <th className='border px-4 py-2'>Nama Tamu</th>
                    <th className='border px-4 py-2'>Email</th>
                    <th className='border px-4 py-2'>Status</th>
                    <th className='border px-4 py-2'>Total Kamar</th>
                    <th className='border px-4 py-2'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    pemesanans.map(pemesanan => {
                      return (
                        <tr key={pemesanan.id_pemesanan} >
                          <td className='border px-4 py-2'>{pemesanan.id_pemesanan}</td>
                          <td className='border px-4 py-2'>{pemesanan.nama_tamu}</td>
                          <td className='border px-4 py-2'>{pemesanan.email_pemesan}</td>
                          <td className='border px-4 py-2'>{pemesanan.status_pemesanan}</td>
                          <td className='border px-4 py-2 text-center'>{pemesanan.jumlah_kamar}</td>
                          <td className='border px-4 py-2'>
                            <button className='bg-yellow-300 px-5 mx-3 rounded text-yellow-600 hover:text-white'>Edit</button>
                            <button className='bg-red-300 px-5 mx-3 rounded text-red-600 hover:text-white'>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}

export default ListPemesanan