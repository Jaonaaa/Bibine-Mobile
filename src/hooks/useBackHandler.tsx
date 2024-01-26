import React, { useEffect } from "react";

const useBackHandler = () => {
  useEffect(() => {
    console.log("Atooo");
    // document.addEventListener("ionBackButton", (ev: any) => {
    //   ev.detail.register(10, (processNextHandler: any) => {
    //     console.log("Handler was called!");
    //     // processNextHandler()
    //   });
    // });
  }, []);
  return {};
};

export default useBackHandler;
