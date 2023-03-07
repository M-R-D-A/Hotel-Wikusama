import React, {useEffect, useState } from 'react';
import axios from 'axios';

const ListDetailPemesanan = () => {
    const [details, setDetails] = useState([]);
    const getDetail = async () => {
        try {
            let response = await axios.get('http://localhost:8080/store/detail_pemesanan');
            setDetails(response.data.detail_pemesanan);
            console.log(response.data);
        } catch(e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getDetail();
    }, [])
    return (
        <div className='py-5'>
        <div className='justify-center flex items-center'>
          <div className='p-5 rounded border shadow-md'>
            <h1 className='text-xl font-bold mb-3'>Daftar detail_pemesanan</h1>
            <table className='table-fixed rounded'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border px-4 py-2'>ID Pemesanan</th>
                  <th className='border px-4 py-2'>ID Kamar</th>
                  <th className='border px-4 py-2'>tgl_akses</th>
                  <th className='border px-4 py-2'>harga</th>
                  <th className='border px-4 py-2'>Akses</th>
                </tr>
              </thead>
              <tbody>
                {
                  details.map(detail_pemesanan => {
                    return (
                      <tr key={detail_pemesanan.id_detail_pemesanan} >
                        <td className='border px-4 py-2'>{detail_pemesanan.id_pemesanan}</td>
                        <td className='border px-4 py-2'>{detail_pemesanan.id_kamar}</td>
                        <td className='border px-4 py-2'>{detail_pemesanan.tgl_akses}</td>
                        <td className='border px-4 py-2'>{detail_pemesanan.harga}</td>
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

export default ListDetailPemesanan