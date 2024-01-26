import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Cat from "../../../assets/img/cat.jpg";

import "./PictureSwaper.sass";

interface PictureSwaperProps {
  pictures: string[];
}

const PictureSwaper = (props: PictureSwaperProps) => {
  const [selectedBox, setSelectedBox] = useState(0);
  const [direction, setDirection] = useState("");
  const listSlider = useRef<HTMLDivElement>(null);
  const pictureBox = useRef<HTMLDivElement>(null);

  const handleSelectBox = (i: number) => {
    if (i < selectedBox) setDirection("left");
    else if (i > selectedBox) setDirection("right");
    else setDirection("");
    setSelectedBox(i);
  };

  useEffect(() => {
    scrollList();
  }, [selectedBox, direction]);

  const scrollList = () => {
    let widthBox = pictureBox.current?.getBoundingClientRect().width;
    if (widthBox) widthBox = widthBox / 4;

    if (direction === "left" && pictureBox.current != null && listSlider.current != null && widthBox != undefined) {
      let gap = listSlider.current.clientWidth - pictureBox.current.getBoundingClientRect().left;
      let max = listSlider.current.clientWidth - widthBox;
      if (max < gap) {
        listSlider.current.scrollTo(pictureBox.current.offsetLeft - widthBox - widthBox / 2, 0);
      }
    } else if (
      direction === "right" &&
      pictureBox.current != null &&
      listSlider.current != null &&
      widthBox != undefined
    ) {
      let gap = pictureBox.current.getBoundingClientRect().left + pictureBox.current?.getBoundingClientRect().width;
      if (gap + widthBox / 3 > listSlider.current.clientWidth) {
        listSlider.current.scrollTo(pictureBox.current.offsetLeft - pictureBox.current.clientWidth, 0);
      }
    }
  };

  return (
    <div className="picture_swaper_container">
      <div className="front_pic">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(e) => {
            handleSelectBox(e.activeIndex);
          }}
          // onSwiper={(swiper: any) => ""}
        >
          <SwiperHandler indexPicture={selectedBox} />
          {props.pictures.map((key, index) => (
            <SwiperSlide key={index}>
              <div className="slide_pic">
                <img src={key} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="list_cover">
        <div className="list_pic" ref={listSlider}>
          {props.pictures.map((key, index) => (
            <div
              ref={index === selectedBox ? pictureBox : null}
              key={index}
              className={`box_pic ${index === selectedBox ? "selected_box_pic" : ""}`}
              onClick={() => {
                handleSelectBox(index);
              }}
            >
              <img src={key} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SwiperHandlerProps {
  indexPicture: number;
}
const SwiperHandler = (props: SwiperHandlerProps) => {
  const swiper = useSwiper();
  useEffect(() => {
    swiper.slideTo(props.indexPicture);
  }, [props.indexPicture]);
  return <></>;
};

export default PictureSwaper;
