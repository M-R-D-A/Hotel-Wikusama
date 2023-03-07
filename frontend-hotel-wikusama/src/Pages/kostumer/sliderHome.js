import React from "react";
import Slider from "react-slick";
const SliderHome = () => {
  const slides = [
    {
      id: 1,
      url: "https://mainlymiles.com/wp-content/uploads/2020/08/Hilton-Singapore-Pool.jpg",
    },
    {
      id: 2,
      url: "https://images.tokopedia.net/blog-tokopedia-com/uploads/2020/02/4.-Family-room-sumber-gambar-newsaphirhotel.jpg",
    },
    {
      id: 3,
      url: "https://mainlymiles.com/wp-content/uploads/2020/08/Hilton-Singapore-Pool.jpg",
    },
    {
      id: 4,
      url: "https://media-cdn.tripadvisor.com/media/photo-s/13/dd/19/15/hilton-singapore.jpg",
    },
    {
      id: 5,
      url: "https://www.konsultasi-akustik.com/wp-content/uploads/2021/02/interior-modern-comfortable-hotel-room-scaled.jpg",
    },
  ];

  const settings = {
    dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerPadding: "20px",
      autoplay: true,
      speed: 750,
      autoplaySpeed: 1500,
      cssEase: "linear"      
  };
  return (
    <div className="px-7 py-10 bg-gray-600">
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      <Slider {...settings}>
        {slides.map(item => (
          <div className="px-3 ">
            <img key={item.id} src= {item.url} alt={item.id} className='border-gray-300 border-2 h-96 max-w-full bg-white rounded-lg  hover:shadow-lg'/>
          </div>
        ))}
      </Slider>
    </div>
  );

};

export default SliderHome;
