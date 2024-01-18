import React, { useEffect, useRef, useState } from "react";
import "./SliderPicture.sass";
import CrossIcon from "../../../assets/icons/CrossIcon";

interface SliderPictureProps {
  pictures: any;
  removePicture: any;
  nameImg: string;
}

const SliderPicture = (props: SliderPictureProps) => {
  const { pictures, removePicture, nameImg } = props;
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

  useEffect(() => {
    if (pictures) handleSelectBox(pictures.length - 1);
  }, [pictures]);
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

  const changePictureImg = (img: any) => {
    let imgContainer = document.getElementById(nameImg) as HTMLImageElement;
    if (imgContainer) {
      imgContainer.src = img;
    }
  };
  return (
    <>
      <div className="list_cover">
        <div className="list_pic" ref={listSlider}>
          {pictures &&
            Array.from(pictures).map((pic, index) => {
              if (pic != undefined) {
                let picture = URL.createObjectURL(pic as Blob | MediaSource);
                return (
                  <React.Fragment key={index}>
                    <div
                      ref={index === selectedBox ? pictureBox : null}
                      className={`box_pic ${index === selectedBox ? "selected_box_pic" : ""}`}
                      onClick={() => {
                        handleSelectBox(index);
                        changePictureImg(picture);
                      }}
                    >
                      <img src={picture} alt="" />
                      <div
                        className="closer"
                        onClick={() => {
                          removePicture(index);
                        }}
                      >
                        <CrossIcon />
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default SliderPicture;
