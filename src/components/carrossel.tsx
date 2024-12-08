import React from "react";
import Slider from "react-slick"; // Presumo que você esteja usando o react-slick

export const Carrossel = ({ title, data }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
        <h1>{title}</h1>
        <Slider {...sliderSettings}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "10vw",
                  height: "10vw",
                  borderRadius: title === "Artistas" ? "50%" : "15px", 
                  backgroundColor: "#10082665",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "17px",
                  textAlign: "center",
                  margin: "10px",
                  boxShadow: title === "Albuns" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none", 
                }}
              >
                {item?.name}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

