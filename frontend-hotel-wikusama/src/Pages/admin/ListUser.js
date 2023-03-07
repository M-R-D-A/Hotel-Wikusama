import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Daftar from './Daftar';

const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getUser = async () => {
      try {
        let response = await axios.get('http://localhost:8080/store/user')
        setUsers(response.data.user);
        console.log(response.data.user);
      } catch(e) {
        console.log(e.message);
      }
    }

    useEffect(() => {
      getUser();
    }, [])
    // {count: 1, tipe_kamar: Array(1)}
  return (
    <div className='py-5'>
          <div className='justify-center flex items-center'>
            <div className='p-5 rounded border shadow-md'>
              <h1 className='text-xl font-bold mb-3'>Daftar User</h1>
              <button className='bg-green-300 px-5   rounded text-green-600 hover:text-white mb-4' 
              onClick={() => setShowModal(true)}>Tambah +</button>
              {showModal && <Daftar onClose={() => setShowModal(false)} />}
              <table className='table-fixed rounded'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border px-4 py-2'>Name</th>
                    <th className='border px-4 py-2'>Email</th>
                    <th className='border px-4 py-2'>Role</th>
                    <th className='border px-4 py-2'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map(user => {
                      return (
                        <tr key={user.id_user} >
                          <td className='border px-4 py-2'>{user.name_user}</td>
                          <td className='border px-4 py-2'>{user.email}</td>
                          <td className='border px-4 py-2'>{user.role}</td>
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

export default ListUser