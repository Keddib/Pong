// import { Link } from "react-router-dom";

import TabBar from "components/TabBar";
import { FunctionComponent, useEffect } from "react";
import ConversationList from "./ConversationList";

const links = {
  first: {
    name: "friends",
    path: "",
  },
  second: {
    name: "rooms",
    path: "",
  },
};

type Props = {
  setIsMessages: (b: boolean) => void;
};

const Messages: FunctionComponent<Props> = ({ setIsMessages }) => {
  useEffect(() => {
    setIsMessages(true);
    return () => setIsMessages(false);
  });

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <div className="bg-queenBlue/50 rounded-2xl p-2 py-4  flex flex-col gap-4">
        <TabBar links={links} />
        <div className="grow">
          <ConversationList />
        </div>
      </div>
    </div>
  );
};

export default Messages;
