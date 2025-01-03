import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { Href } from "../../../utils/constant";
import { useEffect, useState } from "react";

const DarkLight: React.FC = () => {
  const [moonlight, setMoonlight] = useState(false);
  const MoonlightToggle = async (light: boolean) => {
    setMoonlight(!light);
    moonlight
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
    //set a cookie for this if it is not there to remember the user's choice
    localStorage.setItem("theme", light ? "light" : "dark");
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setMoonlight(true);
      document.body.classList.add("dark");
    } else {
      setMoonlight(false);
      document.body.classList.remove("dark");
    }
  }, []);
  
  return (
    <li
      className="header-btn custom-dropdown"
      onClick={() => MoonlightToggle(moonlight)}
    >
      <a className="main-link" href={Href}>
        <DynamicFeatherIcon
          iconName={moonlight ? "Sun" : "Moon"}
          className="icon-light stroke-width-3 iw-16 ih-16"
        />
      </a>
    </li>
  );
};

export default DarkLight;
