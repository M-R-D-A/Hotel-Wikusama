import axios from "axios";
import React, { useState,} from "react";

const Kamar = (props) => {
  const [nomorKamar, setNomorKamar] = useState("");
  const [idTipeKamar, setIdTipeKamar] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(props.idKamar){
      axios
        .put("http://localhost:8080/hotel/kamar/"+ props.idKamar , {
          nomor_kamar: nomorKamar,
          id_tipe_kamar: idTipeKamar,
        })
        .then((res) => {
          setNomorKamar();
          setIdTipeKamar();
        })
        .catch((err) => {
          console.log(err.message);
        });
        console.log('terminally ill')
    } else if(props.idKamar == null){
        axios
          .post("http://localhost:8080/hotel/kamar", {
            nomor_kamar: nomorKamar,
            id_tipe_kamar: idTipeKamar,
          })
          .then((res) => {
            setNomorKamar();
            setIdTipeKamar();
          })
          .catch((err) => {
            console.log(err.message);
          });
    }
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
                    Nomor Kamar
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200
                  text-gray-700  border rounded py-3 px-4 mb-3 leading-tight focus:outline  focus:bg-white"
                    type="text"
                    placeholder="Nomor Kamar"
                    onChange={(ev) =>
                      setNomorKamar(ev.target.value)
                    }
                  />
                </div>
              </div>
              {/* Role */}
              <div className="w-full md:w-1/3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 
                    text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={(ev) => setIdTipeKamar(ev.target.value )}
                    >
                      <option value={1}>Essential</option>
                      <option value={2}>Deluxe</option>
                      <option value={3}>Luxury</option>
                    </select>
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
                onClick={props.onClose}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kamar;
