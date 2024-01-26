import { useEffect, useState } from "react";

const useTimer = (callback: Function, timeWaiting: number, addingTime: number) => {
  const [timer, setTimer] = useState<any>(timeWaiting);
  const [timerId, setTimerId] = useState<any>(0);

  const start = () => {
    setTimerId(setTimeout(updateTimer, 1000));
  };

  const updateTimer = () => {
    setTimer((timer: any) => {
      clearTimeout(timerId);
      if (timer > 0) {
        // console.log(timer--, " imer __  ");
        setTimerId(setTimeout(updateTimer, 1000));
        timer--;
        return timer--;
      } else {
        // when the timer stop what to do ??
        callback();
        stop();
        setTimer(timeWaiting);
        return timer;
      }
    });
  };

  const incrementDuration = () => {
    setTimer((time: any) => time + addingTime);
    updateTimer();
  };

  const stop = () => {
    clearTimeout(timerId);
  };

  return { start, incrementDuration, stop };
};

export default useTimer;
