import useTimer from "./useTimer";

const useBubbleNotif = () => {
  const removeBubble = () => {
    let bubble = document.querySelector(".bubble_in");
    if (bubble) {
      bubble.classList.add("bubble_out");
      setTimeout(() => {
        bubble?.parentNode?.removeChild(bubble);
      }, 350);
    }
  };

  const { incrementDuration, start, stop } = useTimer(removeBubble, 6, 4);

  const showBubbleMessage = () => {
    let container = document.getElementById("bubble_notif");
    let content = container?.querySelector(".bubble_in");
    if (content) {
      //update bubble
      updateBubble(container);
      incrementDuration();
    } else {
      container?.appendChild(createBubble());
      start();
    }
  };

  const createBubble = () => {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble_in");
    bubble.innerHTML = `<div class="icon"> ${messageIcon} </div> 
    <div class="number"> 1 </div> `;
    bubble.addEventListener("click", () => {
      stop();
      removeBubble();
      window.location.href = "/main/notifs";
    });
    return bubble;
  };

  const updateBubble = (container: HTMLElement | null) => {
    if (container) {
      let number = container.querySelector(".number") as any;
      if (number) number.innerHTML = +number.textContent + 1 + "";
    }
  };

  return { showBubbleMessage };
};

const messageIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="29.464" height="29.464" viewBox="0 0 29.464 29.464">
  <path id="Icon_feather-message-circle" data-name="Icon feather-message-circle" d="M30.964,17a12.32,12.32,0,0,1-1.323,5.587,12.5,12.5,0,0,1-11.174,6.91A12.32,12.32,0,0,1,12.88,28.17L4.5,30.964l2.793-8.38A12.32,12.32,0,0,1,5.97,17,12.5,12.5,0,0,1,12.88,5.823,12.32,12.32,0,0,1,18.467,4.5H19.2A12.467,12.467,0,0,1,30.964,16.262Z" transform="translate(-3 -3)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</svg>`;
export default useBubbleNotif;
