import ModeImg from "/src/assets/images/mode1.png"
import ModeImg2 from "/src/assets/images/mode2.png"
import ModeImg3 from "/src/assets/images/mode3.png"
import Mode from "./components/Mode";
export default function Home() {
  return (
    <div className="w-full m-auto">
      <Mode modeName='Test' className='bg-mode-one mt-8 mb-5' player={ModeImg} />
      <div className="flex flex-wrap justify-between gap-y-5">
        <Mode modeName='Test' className='bg-mode-two' player={ModeImg2} />
        <Mode modeName='Test' className='bg-mode-three' player={ModeImg3} />
      </div>
    </div>
  );
}
