import React, { useState } from "react";

const DatePemesanan = ({ onSearch }) => {
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(checkinDate, checkoutDate);
  }
  var column = "flex flex-wrap -mx-3 mb-3";

  return (
    <div className="p-5 justify-center flex items-center">
      <div className="container p-5 md:p-6 shadow-lg rounded-xl border-2 w-full lg:w-3/4">
        <h1 className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-4">
          Pesan Kamar
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={column}>
            <div className="w-2/5 px-1  md:mb-0">
              <label
                htmlFor="checkin-date"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Check-in date:
              </label>
              <input
                type="date"
                id="checkin-date"
                name="checkin-date"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
                py-1.5 px-4  leading-tight focus:outline-none focus:bg-white"
                value={checkinDate}
                onChange={(event) => setCheckinDate(event.target.value)}
                required
              />
            </div>
            <div className="w-2/5 px-1 ">
              <label
                htmlFor="checkout-date"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Check-out date:
              </label>
              <input
                type="date"
                id="checkout-date"
                name="checkout-date"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded
                py-1.5 px-4  leading-tight focus:outline-none focus:bg-white"
                value={checkoutDate}
                onChange={(event) => setCheckoutDate(event.target.value)}
                required
              />
            </div>
            <div className="w-1/5 px-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                submit
              </label>
              <button
                type="submit"
                className="appearance-none block w-full bg-green-500 text-white border rounded
                py-1.5 px-4  leading-tight"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatePemesanan;
