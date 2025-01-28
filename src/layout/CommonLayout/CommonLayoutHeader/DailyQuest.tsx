import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { Href } from "../../../utils/constant";
import { useEffect, useState } from "react";
import ShareModal from "@/Common/CommonPostReact/ShareModal";

const DailyQuest: React.FC = () => {
  const [moonlight, setMoonlight] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const MoonlightToggle = async (light: boolean) => {
    setMoonlight(!light);
    moonlight
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
    //set a cookie for this if it is not there to remember the user's choice
    localStorage.setItem("theme", light ? "light" : "dark");
  };

  return (
    <>
      <li onClick={toggleModal} className="header-btn quest-btn custom-dropdown">
        <div className="user-img">
          <a className="main-link" href={Href}>
            <DynamicFeatherIcon
              iconName={"Server"}
              className="icon-light stroke-width-3 iw-16 ih-32"
            />
          </a>
          <span className="quest-stats quest-count">24</span>
        </div>
      </li>
      <ShareModal type="post" showModal={showModal} toggleModal={toggleModal} />
    </>
  );
};

export default DailyQuest;
