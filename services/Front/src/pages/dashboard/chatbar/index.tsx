import { mediaQueries } from "config/index";
import TabBar from "components/TabBar";
// import UserImg from "/src/assets/images/user.jpg"
import useMedia from "hooks/useMedia";

// var user1 = {
//   id: "123",
//   img: UserImg,
//   name: "AlaeOX7",
//   status: "Online",
//   dot: "green-dot"
// };

const links = {
  first: {
    name: "game",
    path: "#",
  },
  second: {
    name: "friends",
    path: "#",
  },
  third: {
    name: "rooms",
    path: "#",
  },
};

const ChatBar = () => {
  const xl = useMedia(mediaQueries.xl);

  return (
    <>
      {xl && (
        <aside
          className="w-full h-full gradientColor max-w-[400px]
      ml-auto bg-spaceCadet rounded-tl-3xl px-4 pt-8 border border-lotion/50 overflow-hidden"
        >
          <div>
            <TabBar links={links} />
          </div>
          <div className="mt-4 overflow-auto no-scrollbar mini-chat relative">
            <ul className="flex flex-col gap-2"></ul>
            <div className="absolute bottom-0 w-full h-16 flex justify-center items-center">
              <label htmlFor="chat input" className="w-fit">
                <input
                  className="bg-queenBlue/50 rounded-3xl"
                  type="text"
                  placeholder="message..."
                />
              </label>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default ChatBar;
