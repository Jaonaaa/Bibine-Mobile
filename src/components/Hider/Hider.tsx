import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import "./Hider.sass";
import Loader from "../Loader/Loader";

interface HiderProps {
  children?: ReactNode;
  loader?: boolean;
  classCss?: string;
  animate?: "default" | "showUp";
}

const variantHiderBlank = {
  hidden: {
    y: "0%",
  },
  visible: {
    y: "0%",
  },
  leave: {
    opacity: "0%",
  },
};
const variantHiderShowUp = {
  hidden: {
    opacity: "0%",
  },
  visible: {
    opacity: "100%",
  },
  leave: {
    y: "100%",
    opacity: "0%",
  },
};

const showState: any = {
  default: {
    variants: variantHiderBlank,
    initial: "hidden",
    animate: "visible",
    exit: "leave",
    transition: {
      ease: "easeInOut",
      type: "tween",
    },
  },
  showUp: {
    variants: variantHiderShowUp,
    initial: "hidden",
    animate: "visible",
    exit: "leave",
    transition: {
      ease: "easeInOut",
      type: "tween",
      opacity: {
        duration: 0.2,
      },
      y: {
        duration: 0.3,
      },
    },
  },
};
const Hider = (props: HiderProps) => {
  const { loader, classCss, animate } = props;
  const hider = document.getElementById("hider_portal");
  let animation = animate != undefined ? showState[animate] : showState.default;
  animation = animation ? animation : showState.default;

  const hiderComponent = (
    <motion.div {...animation} className={classCss} id="hider">
      {loader && <Loader />}
      {props.children}
    </motion.div>
  );

  if (hider) return createPortal(hiderComponent, hider);
};

// export const Loader = () => {
//   return (
//     <>
//       <div className="loader_container">
//         <div className="lds-ring">
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//     </>
//   );
// };
export default Hider;
