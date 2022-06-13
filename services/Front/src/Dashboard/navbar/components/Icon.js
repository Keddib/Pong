const IconWrap = ({ icon }) => {
  return (
    // change to Link later
    <div className="group flex items-center cursor-pointer w-full h-[60px] mb-2">
      <div className="shiningLine"></div>
      <div className="w-full mr-[5px] flex justify-center "> {icon} </div>
    </div>
  );
};

export default IconWrap;
