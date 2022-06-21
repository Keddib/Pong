// custom hook
import { useState, useEffect } from "react";

export default function useMedia(query) {

  let [matches, setMatches] = useState(
    window.matchMedia(query).matches
  );
  useEffect(() => {
    let media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    let listener = () => {
      setMatches(media.matches);
    }
    media.addEventListener("change", listener);
    return (() => media.removeEventListener('change', listener));
  }, [query, matches])

  return matches;
}
