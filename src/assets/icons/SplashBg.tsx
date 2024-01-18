import React from "react";

const SplashBg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="570" height="478" viewBox="0 0 570 478">
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.28"
          y1="0.053"
          x2="0.731"
          y2="0.942"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#f72222" />
          <stop offset="0.096" stopColor="#e02c39" />
          <stop offset="1" stopColor="#2f79e8" />
        </linearGradient>
        <linearGradient id="linear-gradient-2" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#f72222" />
          <stop offset="1" stopColor="#2f79e8" />
        </linearGradient>
      </defs>
      <g id="Groupe_111" data-name="Groupe 111" transform="translate(60 -93)">
        <circle
          id="Ellipse_7"
          data-name="Ellipse 7"
          cx="165"
          cy="165"
          r="165"
          transform="translate(180 224)"
          fill="url(#linear-gradient)"
        />
        <circle
          id="Ellipse_6"
          data-name="Ellipse 6"
          cx="148"
          cy="148"
          r="148"
          transform="translate(-36 93)"
          fill="url(#linear-gradient-2)"
        />
        <circle
          id="Ellipse_10"
          data-name="Ellipse 10"
          cx="127"
          cy="127"
          r="127"
          transform="translate(-60 317)"
          fill="#3f73d9"
        />
        <rect
          id="Rectangle_26"
          data-name="Rectangle 26"
          width="168"
          height="168"
          rx="23"
          transform="matrix(0.899, 0.438, -0.438, 0.899, 328.324, 97.678)"
          fill="#924d85"
        />
      </g>
    </svg>
  );
};

export default SplashBg;
