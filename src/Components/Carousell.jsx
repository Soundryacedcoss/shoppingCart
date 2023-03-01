import { Card, Carousel } from "@cedcommerce/ounce-ui";
import React from "react";
import banner1 from "../image/ban.jpg";
import banner2 from "../image/banner2.webp";
import banner3 from "../image/banner3.jpg";
import banner4 from "../image/banner5.jpg";
export const Carousell = () => {
  return (
    <div>
      <Card>
        <Carousel autoplay infinite slidesToScroll={1}>
         
            <img src={banner1} alt="" className="banner_img" />
         
        
            <img src={banner3} alt="" className="banner_img" />
         
        
            <img src={banner2} alt="" className="banner_img" />
        
        </Carousel>
      </Card>
    </div>
  );
};
