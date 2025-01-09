import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import {
  ActiveNow,
  Close,
  Href,
  ImagePath,
  Profile,
} from "../../../utils/constant";
import { FC, useState } from "react";
import { Media } from "reactstrap";
import UserProfileMenu from "./UserProfileMenu";
import CustomImage from "@/Common/CustomImage";
import useOutsideDropdown from "@/utils/useOutsideDropdown";
import { useAppSelector } from "@/utils/hooks";
import LoadingLoader from "@/layout/LoadingLoader";

const UserProfile: FC = () => {
  const { isComponentVisible, ref, setIsComponentVisible } =
    useOutsideDropdown(false);
  const user = useAppSelector((state) => state.userSlice.data);
  const loading = useAppSelector((state) => state.userSlice.loading);
  if (!user || loading) {
    return <LoadingLoader />;
  }
  return (
    <li className="header-btn custom-dropdown profile-btn btn-group">
      <a
        className={`main-link ${isComponentVisible ? "show" : ""}`}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <DynamicFeatherIcon
          iconName="User"
          className="icon-light stroke-width-3 d-md-none d-block iw-16 ih-16"
        />
        <Media className="d-none d-md-flex">
          <div className="user-img bg-size blur-up lazyloaded ">
            <CustomImage
              src={
                user.profileImage == null
                  ? `https://cloud.appwrite.io/v1/avatars/initials?name=${user.name}`
                  : user.profileImage
              }
              className="img-fluid blur-up lazyload bg-img"
              alt="user"
            />
            <span className="available-stats online" />
          </div>
          <Media body className="d-none d-md-block">
            <h4>{user == null ? null : user.name} </h4>
            <span className="dropdown">▼</span>
          </Media>
        </Media>
      </a>
      <div
        className={`dropdown-menu dropdown-menu-right ${
          isComponentVisible ? "show" : ""
        } `}
        style={{
          position: "absolute",
          inset: "0px auto auto 0px",
          margin: "0px",
          transform: "translate(-101px, 54px)",
        }}
      >
        <div className="dropdown-header">
          <span>{Profile}</span>
          <div
            className="mobile-close"
            onClick={() => setIsComponentVisible(false)}
          >
            <h5>{Close}</h5>
          </div>
        </div>
        <div className="dropdown-content">
          <UserProfileMenu />
        </div>
      </div>
    </li>
  );
};

export default UserProfile;
