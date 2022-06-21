import Star from "/src/assets/icons/star.svg";

export default function UserStarXP({ user }) {

  return (
    <div className="EX">
      <Star className="fill-crayola w-14 mr-4" />
      <p className=" font-beaufort font-semibold text-xl absolute top-[17px] left-[15px]">
        {user.lvl}
      </p>
      <div className="flex flex-col justify-center grow ">
        <p>{`${user.ex}xp`}</p>
        <div className="w-full h-3 rounded-3xl bg-lotion/50">
          <div className="w-2/3 bg-crayola h-3 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}
