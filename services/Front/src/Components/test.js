import { useState, useEffect } from "react";

const useMountTransition = (isMounted, unmountDelay) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }

    return () => {
      clearTimeout(timeoutId);
    }
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
}

export default useMountTransition;

const Example = () => {
  const [isMounted, setIsMounted] = useState(false);
  const hasTransitionedIn = useMountTransition(isMounted, 1000);
  return (
    <div className="container">
      <button onClick={() => setIsMounted(!isMounted)}>
        {`${isMounted ? 'Hide' : 'Show'} Element`}
      </button>

      <div className="content">
        {(hasTransitionedIn || isMounted) && (<div
          className={`card ${hasTransitionedIn && 'in'} ${isMounted && 'visible'}`}          >
          Card Content
        </div>
        )}
      </div>
    </div>
  );
};
