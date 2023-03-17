import React from 'react';
import 'tailwindcss/tailwind.css';

const About = () => {
  return (
    <div>
        <title>About Us | Hotel Wikusama</title>
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                About Hotel Wikusama
              </h2>
              <p className="mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
                Hotel Wikusama didirikan Oleh Muhammad Rafi Duta Attala, seorang pengusaha muda brilian dari pare kediri. Hotel Wikusama telah menjadi saksi berbagai event penting seperti pernikahan anak presiden ketujuh Indonesia Joko Widodo
              </p>
              <div className="flex items-center mt-8">
                <span className="ml-2 text-gray-600 text-sm">4.9 (100 reviews)</span>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:flex">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-3xl sm:leading-9">
                Our Facilities
              </h3>
              <ul className="mt-4 text-lg leading-7 text-gray-500">
                <li>
                  <span className="font-semibold text-gray-900">Free Wi-Fi:</span> Kami menyediakan wifi gratis dengan kecepatan tinggi dari First Media
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Fitness Center:</span> Kami menyediakan fitness center agar tamu bisa tetap rutin melakukan olahraga merek
                </li>
                <li className="mt-2">
                  <span className="font-semibold text-gray-900">Swimming Pool:</span> Kami menyediakan kolam renang 5 x 20 meter 
                </li>
                <li className="mt-2">
                  <span className="font-semibold text-gray-900">Spa and Massage:</span> Kami menyediakan spa dan massage yang berkolaborasi dengan perusahaan perancis de'javu
                </li>
                <li className="mt-2">
                  <span className="font-semibold text-gray-900">24/7 Room Service:</span> Untuk kenyaman maksimal pengunjung kami menyediakan layanan kamar 24/7
                </li>
              </ul>
            </div>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

  