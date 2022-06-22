import { useEffect, useState } from "react"

export default function useAnimate(initValue) {

  let [mounted, setMount] = useState(initValue);

  useEffect(() => {
    window.requestAnimationFrame(() => { setMount(true) });
  }, [initValue]);

  return mounted;
}
