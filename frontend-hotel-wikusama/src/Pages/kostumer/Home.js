import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Pemesanan from "./Pemesanan";
import SliderHome from "./sliderHome";
import DatePemesanan from "./DatePemesanan";
const Home = () => {

  return (
    <Fragment>
      <SliderHome />
      <div className="p-1">
      <DatePemesanan />
      </div>
      <div className="py-12 bg-hero-pattern bg-cover bg-blend-saturation rounded-xl m-5">
        <div className="container mx-auto px-6 content-center place-items-center">
          <h2 className="text-4xl font-bold mb-2 text-white outline-4 text-center">
            Pengalaman Nyaman Dan Elegan
          </h2>
          <h3 className="text-2xl mb-10 text-gray-200 text-center">
            Tempat nya Healing
          </h3>
          <h1 className="text-4xl font-bold mb-2 text-white outline-4 text-center">
            Wikusama
          </h1>
          <div className="flex justify-center items-center mt-10"> 
            <NavLink to="/pemesanan">
              <button
                className="text-white bg-green-500
              hover:shadow-lg text-center hover:bg-green-500 hover:text-yellow-500 
              font-bold rounded-full py-4 px-8  shadow-lg uppercase tracking-wider
              outline-offset-4 border-white hover:border-yellow-500 border-2
              transition-all duration-200 ease-linear"
              >
                pesan
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
