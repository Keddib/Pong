// import { FullScreen, useFullScreenHandle } from "react-full-screen";

// import { MD } from "/src/Components/Constants";
// import useMedia from "/src/Hooks/useMedia";

function Rooms() {
  // let md = useMedia(MD);
  // const handle = useFullScreenHandle();

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <div className="bg-queenBlue/50 rounded-2xl py-4 pl-4 flex flex-col gap-4">
        <div>
          <button className="button--1">Enter fullscreen</button>

          {/* <FullScreen handle={handle}>Any fullscreen content here</FullScreen> */}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
