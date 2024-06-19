import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SimpleSlider.scss';
import axios from 'axios';
import SliderItem from './sliderItem/SliderItem';

function SimpleSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '25%', // 양쪽 이미지의 보이는 부분 설정
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '0',
        },
      },
    ],
  };
  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await axios.get('http://localhost:8181/main/slider');
        setSliderItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSlider();
  }, []);

  return (
    <Slider {...settings}>
      {sliderItems.map((sliderItem) => (
        <SliderItem key={sliderItem.dataId} props={sliderItem} />
      ))}
    </Slider>
  );
}

export default SimpleSlider;
