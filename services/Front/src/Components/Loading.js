import Logo from "./Logo";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Logo className="animate-bounce" />
    </div>
  );
}
