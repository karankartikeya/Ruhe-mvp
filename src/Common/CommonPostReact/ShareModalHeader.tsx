import { FC, useState } from "react";
import {Dropdown,DropdownMenu,DropdownToggle} from "reactstrap";
import DynamicFeatherIcon from "../DynamicFeatherIcon";
import { Href, ShareAsPost } from "../../utils/constant";

const ShareModalHeader: FC = () => {
  const [postDropDown, setPostDropDown] = useState(false);
  const dropDownList = ["share as post","on friend's feed","in a group","share as message",];

  return (
    <div className="setting-dropdown">
      <h3>Daily Quest</h3>
    </div>
  );
};

export default ShareModalHeader;
