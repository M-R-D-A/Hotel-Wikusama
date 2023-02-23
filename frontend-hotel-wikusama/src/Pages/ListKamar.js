import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListKamar = () => {
    const [kamars, setKamars] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getKamar = async () => {
        try {
            let response = await axios.get('http://localhost:8080/store/kamar')
            setKamars(response.data.kamar)
            console.log(response.data.kamar)
        } catch(e) {
            console.log(e.message);
        }
    }
    useEffect(() => {
        getKamar();
    }, [])

  return (
    <div className='py-5'>
          <div className='justify-center flex items-center'>
            <div className='p-5 rounded border shadow-md'>
              <h1 className='text-xl font-bold mb-3'>Daftar Kamar</h1>
              <table className='table-fixed rounded'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border px-4 py-2'>ID </th>
                    <th className='border px-4 py-2'>Nomor Kamar</th>
                    <th className='border px-4 py-2'>Tipe Kamar</th>
                    <th className='border px-4 py-2'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    kamars.map(kamar => {
                      return (
                        <tr key={kamar.id_kamar} >
                          <td className='border px-4 py-2'>{kamar.id_kamar}</td>
                          <td className='border px-4 py-2'>{kamar.nomor_kamar}</td>
                          <td className='border px-4 py-2'>{kamar.id_tipe_kamar}</td>
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

export default ListKamar