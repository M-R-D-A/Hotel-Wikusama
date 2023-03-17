import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Pemesanan = () => {
  const [namaPemesan, setNamaPemesan] = useState("");
  const [emailPemesan, setEmailPemesan] = useState("");
  const [tglCheckIn, setTglCheckIn] = useState("");
  const [tglCheckOut, setTglCheckOut] = useState("");
  const [namaTamu, setNamaTamu] = useState();
  const [tipeKamar, setTipeKamar] = useState(1);
  const tanggalPemesanan = new Date();
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [kamarKosong, setKamarKosong] = useState();
  const [alert, setAlert] = useState("kosong");
  const [pergi, setPergi] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(pergi){
      const uniqueNumber = () => {
        return new Date().getTime() + Math.random();
      };
      axios
        .post("http://localhost:8080/hotel/pemesanan", {
          nomor_pemesan: uniqueNumber(),
          nama_pemesan: namaPemesan,
          email_pemesan: emailPemesan,
          tgl_pemesanan: tanggalPemesanan,
          tgl_check_in: tglCheckIn,
          tgl_check_out: tglCheckOut,
          nama_tamu: namaTamu,
          jumlah_kamar: state.count,
          id_tipe_kamar: tipeKamar,
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
  useEffect(() => {
    const getKamarKosong = async () => {
      if (tglCheckIn && tglCheckOut) {
        try {
          let response = await axios.post(
            "http://localhost:8080/hotel/tipe_kamar/kosong",
            {
              id: tipeKamar,
              tgl_check_in: tglCheckIn,
              tgl_check_out: tglCheckOut,
            }
          );
          console.log(tglCheckIn);
          console.log(tglCheckOut);
          console.log(response);
          if (response.data.tipe_kamar.length === 0) {
            console.log("anjay");
            setKamarKosong(0);
          } else {
            if (response.data.tipe_kamar[0].kamar.length > 0) {
              console.log(response.data.tipe_kamar);
              setKamarKosong(response.data.tipe_kamar[0].kamar.length);
            }
          }
          //  else if(!response.data.tipe_kamar){
          //   console.log('anjay')
          //   setAlert('kamar penuh')
          // }
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    getKamarKosong();
  }, [tglCheckIn, tglCheckOut, tipeKamar]);

  useEffect(() => {
    if (kamarKosong === 0) {
      setAlert("kamar penuh");
    } else if (kamarKosong > 0) {
      setAlert(`Ada ${kamarKosong} kamar tersedia`);
    }
  }, [kamarKosong]);

  var column = "flex flex-wrap -mx-3 mb-3";
  return (
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
          {/* TGL Check In/ Check Out, Tipe Kamar, Jumlah Kamar */}
          <div className={column}>
            {/* Check In*/}
            <div className="w-full md:w-1/4 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Check In
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
              py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="date"
                placeholder="Tanggal Check In"
                onChange={(ev) => setTglCheckIn(ev.target.value)}
              />
            </div>
            {/* Check Out*/}
            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Check Out
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
              py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="date"
                placeholder="Tanggal Check Out"
                onChange={(ev) => setTglCheckOut(ev.target.value)}
              />
            </div>
            {/* Tipe Kamar*/}
            <div className="w-full md:w-1/4 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Tipe Kamar
              </label>
              <div className="relative">
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
                  py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  onChange={(ev) => setTipeKamar({ data: ev.target.value })}
                >
                  <option
                    className="py-1 px-2 block appearance-none"
                    value="1"
                    key="1"
                  >
                    Essential
                  </option>
                  <option
                    className="py-1 px-2 block appearance-none"
                    value="2"
                    key="2"
                  >
                    Luxury
                  </option>
                </select>
              </div>
            </div>
            {/* Jumlah Kamar */}
            <div className="w-full md:w-1/4 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Jumlah Kamar
              </label>
              <div
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
                  py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                <button
                  className="bg-green-300 text-green-600 rounded px-2"
                  onClick={() => dispatch({ type: "increment" })}
                >
                  +
                </button>
                <button
                  className="bg-red-300 text-red-600 mx-3 rounded px-2"
                  onClick={() => dispatch({ type: "decrement" })}
                >
                  -
                </button>
                {state.count}
              </div>
              <p>{alert}</p>
            </div>
          </div>
          {/* Button Submit*/}
          <div className="flex flex-wrap -mx-3 mb-2 w-full">
            {/* Button Submit */}
            <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                submit
              </label>
              <div className="relative">
                <button
                  type="submit"
                  className="rounded-xl p-1.5 w-1/3 text-white  bg-green-500"
                  onClick={() => setPergi(true) && handleSubmit}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pemesanan;
