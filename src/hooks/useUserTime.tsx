import { storage } from "../data/storage";
import useNav from "./useNav";

const useUserTime = () => {
  const { to_pop } = useNav();
  const firstTime = () => {
    return window.localStorage.getItem(storage.firstTime) !== null ? false : true;
  };

  const closeFirstTime = () => {
    window.localStorage.setItem(storage.firstTime, "on");
  };

  const log = () => {
    if (!firstTime()) window.location.href = storage.homePage;
  };
  return { firstTime, closeFirstTime, log };
};

export default useUserTime;
