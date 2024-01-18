import React from "react";
import MicroAnnonce from "../MicroAnnonce/MicroAnnonce";
import { getNumberPrice } from "../../../utils/Format";

const annonces = [
  {
    name: "Audio Poro",
    price: getNumberPrice(100000, 500000),
  },
  {
    name: "Audio ADSD",
    price: getNumberPrice(100000, 500000),
  },
  {
    name: "Audio ADSD",
    price: getNumberPrice(100000, 500000),
  },
  {
    name: "Audio ADSD",
    price: getNumberPrice(100000, 500000),
  },
  {
    name: "Audio ADSD",
    price: getNumberPrice(100000, 500000),
  },
  {
    name: "Audio ADSD",
    price: getNumberPrice(100000, 500000),
  },
  {
    name: "Audio ADSD",
    price: getNumberPrice(100000, 500000),
  },
];
const MyAnnonces = () => {
  return (
    <div className="list_annonce">
      {annonces.map((annonce, index) => (
        <MicroAnnonce key={index} {...annonce} id={index} />
      ))}
    </div>
  );
};

export default MyAnnonces;
