import { useEffect, useState } from "react";

const useViewPort = () => {
  const [sm, setSM] = useState(false);
  const [md, setMD] = useState(false);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    let width = window.innerWidth;
    isSM(width);
    isMD(width);
  };

  const isSM = (width: number) => {
    if (width <= 540) setSM(true);
    else setSM(false);
  };
  const isMD = (width: number) => {
    if (width > 540 && width < 1000) setMD(true);
    else setMD(false);
  };

  return { sm, md };
};

export default useViewPort;
