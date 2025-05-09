import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { Href, FriendRequest, Close } from "../../../utils/constant";
import Link from "next/link";
import { useState } from "react";
import DropdownContent from "./DropdownContent";

const AddPost: React.FC = () => {
  const [showFriendList, setShowFriendList] = useState(false);
  return (
    <ul className="btn-group plus-group">
      <li className="header-btn plus-btn">
        <Link className="main-link" href="/profile/newsfeed">
          <DynamicFeatherIcon iconName="PlusSquare" className="icon-light stroke-width-3 iw-16 ih-16"/>
        </Link>
      </li>
      {/* <li className="header-btn custom-dropdown dropdown-lg add-friend">
        <a className={`main-link ${showFriendList ? "show" : ""}`} href={Href}>
          <DynamicFeatherIcon iconName="UserPlus" className="icon-light stroke-width-3 iw-16 ih-16" onClick={() => setShowFriendList(!showFriendList)}/>
        </a>
        <div className={`dropdown-menu ${showFriendList ? "show" : ""}`}>
          <div className="dropdown-header">
            <span>{FriendRequest}</span>
            <div className="mobile-close" onClick={() => setShowFriendList(false)}>
              <h5>{Close}</h5>
            </div>
          </div>
          <DropdownContent />
        </div>
      </li> */}
    </ul>
  );
};

export default AddPost;
