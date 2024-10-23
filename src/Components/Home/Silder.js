import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'

import sliderimg from "../../images/slider1.png";
import slider4 from "../../images/slider4.png";
import prod3 from "../../images/prod3.png";
import prod4 from "../../images/prod4.png";

const Slider = () => {
    const [index, setIndex] = useState(0)
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className="slider-background" interval={2000}>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img
              style={{ height: "20vw", width: "20%" }} /* استخدام وحدات نسبية */
              src={slider4}
              alt="First slide"
            />
            <div>
              <h3 className="slider-title">Big Discount Available</h3>
              <p className="slider-text">Up to 50% discount on your purchase</p>
            </div>
          </div>
        </Carousel.Item>
      
        <Carousel.Item className="slider-background2" interval={2000}>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img
              style={{ height: "20vw", width: "20%" }} /* استخدام وحدات نسبية */
              src={sliderimg}
              alt="Second slide"
            />
            <div>
              <h3 className="slider-title">Big Discount Available</h3>
              <p className="slider-text">Up to 50% discount on your purchase</p>
            </div>
          </div>
        </Carousel.Item>
      
        <Carousel.Item className="slider-background3" interval={2000}>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img
              style={{ height: "20vw", width: "20%" }} /* استخدام وحدات نسبية */
              src={prod3}
              alt="Third slide"
            />
            <div>
              <h3 className="slider-title">Big Discount Available</h3>
              <p className="slider-text">Up to 50% discount on your purchase</p>
            </div>
          </div>
        </Carousel.Item>
      
        <Carousel.Item className="slider-background4" interval={2000}>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img
              style={{ height: "20vw", width: "20%" }} /* استخدام وحدات نسبية */
              src={prod4}
              alt="Fourth slide"
            />
            <div>
              <h3 className="slider-title">Big Discount Available</h3>
              <p className="slider-text">Up to 50% discount on your purchase</p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      
    )
}

export default Slider