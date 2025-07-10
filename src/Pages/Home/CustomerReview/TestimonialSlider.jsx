import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import TestimonialCard from "./TestimonialCard";
import { FaManatSign } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";

const testimonials = [
  {
    title:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. ",
    description: "This is the first card.",
    avatar: <FaUserPlus size={30} />,
    role: "Senior Dev",
  },
  {
    title:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. ",
    description: "This is the second card.",
    avatar: <FaUserPlus size={30} />,
    role: "Senior Dev",
  },
  {
    title:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. ",
    description: "This is the third card.",
    avatar: <FaUserPlus size={30} />,
    role: "Senior Dev",
  },
  {
    title:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. ",
    description: "This is the fourth card.",
    avatar: <FaUserPlus size={30} />,
    role: "Senior Dev",
  },
  {
    title:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. ",
    description: "This is the fifth card.",
    avatar: <FaUserPlus size={30} />,
    role: "Senior Dev",
  },
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null); // For manual navigation
  return (
    <div className="pt-16 px-4 mt-20">
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centerInsufficientSlides={false}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        spaceBetween={170}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={{ el: ".custom-pagination", clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: false,
        }}
        className="w-11/12 !pt-24 mx-auto "
      >
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          const slideClass = isActive
            ? "opacity-100 scale-[1.5] z-10 -translate-y-10"
            : "opacity-50 scale-[1.2] translate-y-0";
          return (
            <SwiperSlide
              key={index}
              className={`!overflow-visibletransition-all duration-500 transform py-10 px-2 ${slideClass}`}
            >
              <TestimonialCard testimonial={testimonial}></TestimonialCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* 🔻 Custom Center-Aligned Pagination + Arrows */}
      <div className="w-1/2 mx-auto flex justify-center items-center gap-4 mt-6">
        <button className="custom-prev text-2xl hover:text-blue-500 active:scale-120">
          ◀
        </button>
        <div className="custom-pagination flex justify-center items-center gap-2"></div>
        <button className="custom-next text-2xl hover:text-blue-500 active:scale-120">
          ▶
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
