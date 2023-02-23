import React from "react";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1> Sebuah error telah terjadi</h1>
        <p> Tidak bisa menemukan halaman ini</p>
      </main>
    </>
  );
};

export default ErrorPage;
