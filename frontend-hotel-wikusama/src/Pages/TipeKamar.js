import axios from "axios";
import React, { useState, useEffect } from "react";

const TipeKamar = ({onClose }) => {
  const [namaTipeKamar, setNamaTipeKamar] = useState("");
  const [harga, setHarga] = useState();
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    console.log(namaTipeKamar);

    formData.append("nama_tipe_kamar", namaTipeKamar.data);
    formData.append("harga", harga.data);
    formData.append("deskripsi", deskripsi.data);
    formData.append("foto", selectedFile, selectedFile.name);
    axios
      .post("http://localhost:8080/store/tipe_kamar", formData)
      .then((res) => {
        setNamaTipeKamar("");
        setHarga("");
        setDeskripsi("");
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
          <div className="container p-10 shadow-lg rounded-xl border-2 w-2/4">
            <form>
              <div className={column}>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nama Tipe Kamar
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200
                  text-gray-700  border rounded py-3 px-4 mb-3 leading-tight focus:outline  focus:bg-white"
                    type="text"
                    placeholder="Nama Tipe Kamar"
                    onChange={(ev) =>
                      setNamaTipeKamar({ data: ev.target.value })
                    }
                  />
                </div>
              </div>
              <div className={column}>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Harga
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200
                  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white"
                    type="text"
                    placeholder="harga"
                    onChange={(ev) => setHarga({ data: ev.target.value })}
                  />
                </div>
              </div>
              <div className={column}>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Deskripsi
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200
                  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white"
                    type="text"
                    placeholder="Deskripsi"
                    onChange={(ev) => setDeskripsi({ data: ev.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2 w-full">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    File
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
                  dark:text-gray-400 focus:outline-none"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={onSelectFile}
                  />
                </div>
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

export default TipeKamar;
