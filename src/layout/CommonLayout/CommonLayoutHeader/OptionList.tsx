import { FC } from "react";
import DarkLight from "./DarkLight";
import HeaderMessage from "./HeaderMessage";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import SearchBox from "./SearchBox";
import FriendRequest from "./FriendRequest";
import LeftButtons from "./LeftButtons";
import AddPost from "./AddPost";

const OptionList: FC = () => {
  return (
    <ul className="option-list">
      <AddPost/>
      <UserProfile />
      <HeaderMessage />
      <DarkLight />
      {/* <Notification /> */}
      
      

    </ul>
  );
};

export default OptionList;
