import axios from 'axios';
import React, { useState } from 'react'

const EditStatus = (props) => {
    const [status, setStatus] = useState({data: ''});

    const handleSubmit = (e) => {
        e.preventDefault();

    axios
      .put("http://localhost:8080/hotel/pemesanan/status/" + props.id_pemesanan, {
        status_pemesanan : status.data        
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  return (
    <div className="fixed inset-0 py-14 bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white w-11/12 md:w-3/4 mx-auto rounded-md shadow-lg z-50">
        <div className="p-10 justify-center flex items-center gap-10">
          <div className="container p-10 shadow-lg rounded-xl border-2 w-2/4">
            <form >
              {/* Role */}
              <div className="px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 
                    text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={(ev) => setStatus({ data: ev.target.value })}
                    >
                      <option>baru</option>
                      <option>check_in</option>
                      <option>check_out</option>
                    </select>
                  </div>
              <button
                className="rounded-xl p-4 text-white  bg-green-500"
                onClick={handleSubmit}
              >
                submit
              </button>
              <button
                  className="rounded-xl p-4 text-white  bg-red-500"
                  onClick={props.onClose}
                >
                  Close
                </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
 )
}

export default EditStatus