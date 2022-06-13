export default function Logo({ className }) {
  return (
    <div className="group w-[48px] h-16 bg-transparent flex flex-col justify-center items-center">
      <span
        className={`ball circle w-[40px] h-[40px] bg-lotion rounded-full inline-block transition ease-in-out delay-150 ${className}`}
      ></span>
      <span className="ballbase w-full h-2 bg-lotion inline-block mt-2"></span>
    </div>
  );
}
