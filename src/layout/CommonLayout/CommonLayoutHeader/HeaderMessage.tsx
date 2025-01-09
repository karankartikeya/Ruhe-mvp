import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { Close, Href, Messages } from "../../../utils/constant";
import RightOption from "./RightOption";
import { Input } from "reactstrap";
import UserMessage from "./UserMessage";
import useOutsideDropdown from "@/utils/useOutsideDropdown";
import Link from "next/link";

const HeaderMessage: React.FC = () => {
  const { isComponentVisible, ref, setIsComponentVisible } =
    useOutsideDropdown(false);

  return (
    <ul className="btn-group plus-group">
      <li className="header-btn message-btn">
        <Link href="#" className="main-link">
          <DynamicFeatherIcon
            iconName="MessageSquare"
            className="icon-light stroke-width-3 iw-16 ih-16"
          />
        </Link>
      </li>
    </ul>
  );
};

export default HeaderMessage;
