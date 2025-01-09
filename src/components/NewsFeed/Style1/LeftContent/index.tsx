import UserProFile from "@/Common/UserProFile";
import { FC } from "react";

import LikedPages from "./LikedPages";
import FriendSuggestion from "../ContentCenter/FriendSuggestion";

const ContentLeft: FC = () => {
  return (
    <div className="content-left">
      <UserProFile />
      {/* <FriendSuggestion/> */}
      <LikedPages />
    </div>
  );
};

export default ContentLeft;
