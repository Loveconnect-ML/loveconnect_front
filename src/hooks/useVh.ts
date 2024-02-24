
import { useEffect, useState } from "react";

function useVh() {
  const [screenLoaded, setScreenLoaded] = useState(false);

  function setScreenHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenHeight();
    setScreenLoaded(true);
    window.addEventListener("resize", setScreenHeight);

    // resize 이벤트가 발생하면 다시 계산하도록 아래 코드 추가

    return () => window.removeEventListener("resize", setScreenHeight);
  }, []);

  return screenLoaded;
}

export default useVh;