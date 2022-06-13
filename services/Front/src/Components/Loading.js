import Logo from "./Logo";
import { ShiningDot } from "./Dot";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Logo className="animate-bounce" />
      <div className="text-lotion capitalize font-semibold pb-2">
        <h4 className="inline mr-1"> loading </h4>
        <ShiningDot className="bg-lotion" />
        <ShiningDot className="bg-lotion" />
        <ShiningDot className="bg-lotion" />
      </div>
    </div>
  );
}
