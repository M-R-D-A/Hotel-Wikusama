import axios from "axios";
import React, { useState } from "react";

const Booking = (props) => {
  const [namaPemesan, setNamaPemesan] = useState("");
  const [namaTamu, setNamaTamu] = useState("");
  const [emailPemesan, setEmailPemesan] = useState("");
  const [pergi, setPergi] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pergi) {
      const uniqueNumber = () => {
        return new Date().getTime() + Math.random();
      };
      axios
        .post("http://localhost:8080/hotel/pemesanan", {
          nomor_pemesan: uniqueNumber(),
          nama_pemesan: namaPemesan,
          email_pemesan: emailPemesan,
          nama_tamu: namaTamu,
        })
        .then((res) => {
          console.log("anjing");
          setPergi(false);
          setNamaPemesan("");
        })
        .catch((error) => {
          setPergi(false);
          console.log(error.message);
        });
    }
  };
  var column = "flex flex-wrap -mx-3 mb-3";
  return (
    <div className="fixed inset-0 py-14 bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white w-11/12 md:w-3/4 mx-auto rounded-md shadow-lg z-50">
        <div className="p-5 justify-center flex items-center ">
          <div className="container p-5 md:p-6 shadow-lg rounded-xl border-2 w-full lg:w-3/4">
            <form onSubmit={handleSubmit}>
              {/* Nama Pemesan, Email, Nama Tamu */}
              <div className={column}>
                {/* Nama Pemesan */}
                <div className="w-full sm:w-1/3 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nama Pemesan
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
                py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Nama Pemesan"
                    onChange={(ev) => setNamaPemesan(ev.target.value)}
                  />
                </div>
                {/* Email*/}
                <div className="w-full sm:w-1/3 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email Pemesan
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
                  py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Email Pemesan"
                    onChange={(ev) => setEmailPemesan(ev.target.value)}
                  />
                </div>
                {/* Nama Tamu */}
                <div className="w-full sm:w-1/3 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nama Tamu
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
                  py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Nama Tamu"
                    onChange={(ev) => setNamaTamu(ev.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
