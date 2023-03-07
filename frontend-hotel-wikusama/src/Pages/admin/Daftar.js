import React, { useEffect, useState } from "react";
import axios from "axios";

const Daftar = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // membuat preview sebagai side effect yang berubah ketika file dipilih
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // ketika input file berubah maka akan mentrigger const ini
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]); // mengembalikan file
  };

  // submit form daftar ke backend menggunakan form append dan axios
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("name_user", nameUser.data);
    formData.append("foto", selectedFile, selectedFile.name);
    formData.append("email", email.data);
    formData.append("password", password.data);
    formData.append("role", role.data);
    axios
      .post("http://localhost:8080/store/user", formData)
      .then((res) => {
        setNameUser("");
        setEmail("");
        setPassword("");
        setRole(null);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  var column = "flex flex-wrap -mx-3 mb-6";

  return (
    <div className="fixed inset-0 py-14 bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white w-11/12 md:w-3/4 mx-auto rounded-md shadow-lg z-50">
        <div className="p-10 justify-center flex items-center gap-10">
          <div className="container p-10 shadow-lg rounded-xl border-2 w-3/4 ">
            <form onSubmit={handleSubmit}>
              {/* Nama */}
              <div className={column}>
                <div className="w-full  px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 
                            text-xs font-bold mb-2"
                  >
                    Nama
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 
                            text-gray-700 border rounded 
                            py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Nama"
                    onChange={(ev) => setNameUser({ data: ev.target.value })}
                  />
                </div>
              </div>
              {/* Email / Nomor*/}
              <div className={column}>
                <div className="w-full  px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email / Nomor Handphone
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 
                            text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="@ Email / No Hape"
                    onChange={(ev) => setEmail({ data: ev.target.value })}
                  />
                </div>
              </div>
              {/* Password */}
              <div className={column}>
                <div className="w-full px-3 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="password"
                    placeholder="password"
                    onChange={(ev) => setPassword({ data: ev.target.value })}
                  />
                  <p className="text-gray-600 text-xs italic">
                    Make it as long and as crazy as you'd like
                  </p>
                </div>
              </div>
              {/* Role & File */}
              <div className="flex flex-wrap -mx-3 mb-2 w-full">
                {/* Role */}
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 
                    text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={(ev) => setRole({ data: ev.target.value })}
                    >
                      <option>Admin</option>
                      <option>Resepsionis</option>
                    </select>
                  </div>
                </div>
                {/* File */}
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Upload file
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
                            dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={onSelectFile}
                  />
                </div>
                <button
                  className="rounded-xl p-4 text-white  bg-green-500"
                  onClick={handleSubmit}
                >
                  submit
                </button>
                <button
                  className="rounded-xl p-4 text-white  bg-red-500"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
          <div className="p-10 shadow-lg rounded-xl border-2">
            {selectedFile && (
              <img src={preview} className="max-h-96" alt="anjay" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
