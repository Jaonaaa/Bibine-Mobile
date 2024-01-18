import { useIonRouter } from "@ionic/react";

const useNav = () => {
  const navigation = useIonRouter();

  const to_ = (url: string) => {
    navigation.push(url, "none", "push");
  };
  const to_pop = (url: string) => {
    navigation.push(url, "none", "pop");
  };
  const to_forward = (url: string) => {
    navigation.push(url, "forward", "push");
  };

  const to = (url: string) => {
    navigation.push(url, "back", "pop");
  };

  return { to, to_, to_forward, to_pop };
};

export default useNav;
