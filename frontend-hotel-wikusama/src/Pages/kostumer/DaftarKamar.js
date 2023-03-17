import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePemesanan from "./DatePemesanan";
import Pemesanan from "./Pemesanan";

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

const DaftarKamar = (props) => {
  const [daftarKamar, setDaftarKamar] = useState([]);
  let location = useLocation();
  const [tglCheckIn, setTglCheckIn] = useState(location.state?.checkinDate);
  const [tglCheckOut, setTglCheckOut] = useState(location.state?.checkoutDate);
  const [namaPemesan, setNamaPemesan] = useState("");
  const [emailPemesan, setEmailPemesan] = useState("");
  const [namaTamu, setNamaTamu] = useState();
  const [tipeKamar, setTipeKamar] = useState(1);
  const tanggalPemesanan = new Date();
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [kamarKosong, setKamarKosong] = useState();
  const [alert, setAlert] = useState("kosong");
  const [pergi, setPergi] = useState(false);
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
          tgl_pemesanan: tanggalPemesanan,
          tgl_check_in: tglCheckIn,
          tgl_check_out: tglCheckOut,
          nama_tamu: namaTamu,
          jumlah_kamar: state.count,
          id_tipe_kamar: tipeKamar,
        })
        .then((res) => {
          console.log("berhasil");
          localStorage.setItem('email_pemesan', emailPemesan);
          window.location.href = 'bukti';
          setPergi(false);
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
  const getDaftarKamar = async () => {
    console.log(location);
    console.log(tglCheckIn);
    console.log(tglCheckOut);
    if (tglCheckIn && tglCheckOut) {
      try {
        let response = await axios.post(
          "http://localhost:8080/hotel/tipe_kamar/kosong/all",
          {
            tgl_check_in: tglCheckIn,
            tgl_check_out: tglCheckOut,
          }
        );
        setDaftarKamar(response.data.tipe_kamar);
        console.log(response.data.tipe_kamar);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      try {
        let response = await axios.get(
          "http://localhost:8080/hotel/tipe_kamar"
        );
        setDaftarKamar(response.data.tipe_kamar);
        console.log(response.data.tipe_kamar);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    getDaftarKamar();
  }, [tglCheckIn, tglCheckOut]);

  const column = "flex flex-wrap -mx-3 mb-3";
  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className="px-16 flex flex-wrap justify-center items-center">
        {/*Pemesanan */}
        <div className="py-5 w-full lg:w-3/4 flex flex-wrap justify-center items-center">
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
                    value={tglCheckIn}
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
                    value={tglCheckOut}
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
                      onChange={(ev) => setTipeKamar(ev.target.value )}
                    >
                      <option
                        className="py-1 px-2 block appearance-none"
                        value={1}
                        key="1"
                      >
                        Essential
                      </option>
                      <option
                        className="py-1 px-2 block appearance-none"
                        value={2}
                        key="2"
                      >
                        Deluxe
                      </option>
                      <option
                        className="py-1 px-2 block appearance-none"
                        value={3}
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
                    {kamarKosong > state.count 
                    ? <button
                    className="bg-green-300 text-green-600 rounded px-2"
                    onClick={() => dispatch({ type: "increment" })}
                  >
                    +
                  </button> 
                    : <div></div>}
                    
                    <button
                      className="bg-red-300 text-red-600 mx-3 rounded px-2"
                      onClick={state.count > 0 ? () => dispatch({ type: "decrement" }) : state}
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
        {/* Get Kamar lalu dimasukkan ke dalam Card di bawah ini*/}
        {daftarKamar.map((kamar) => {
          return (
            // Card
            <div
              className="p-5 rounded-xl border shadow-md grid grid-cols-4 w-full sd:w-3/5"
              key={kamar.id_tipe_kamar}
            >
              <img
                src={kamar.image}
                alt={kamar.nama_tipe_kamar}
                className="w-full h-full object-contain rounded-md"
              />
              <div className="col-span-3 pl-7">
                <h1 className="text-3xl font-semibold mb-3">
                  {kamar.nama_tipe_kamar}
                </h1>
                {kamar.kamar.length > 0 ? (
                  <h2 className="text-green-600">
                    Ada {kamar.kamar.length} kamar tersedia
                  </h2>
                ) : (
                  <h2 className="text-red-600">kamar habis</h2>
                )}
                <h3>{kamar.deskripsi}</h3>
                <h3 className="py-10">{kamar.harga}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaftarKamar;
