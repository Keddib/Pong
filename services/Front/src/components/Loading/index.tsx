import Logo from "components/Logo";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Logo className="animate-bounce" />
    </div>
  );
}
