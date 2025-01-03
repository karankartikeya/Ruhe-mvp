"use client";
import CustomImage from "@/Common/CustomImage";
import {
  ChoosePhoto,
  EditProfile,
  ImagePath,
  RemovePhoto,
  SetPosition,
  UploadPhoto,
} from "../../utils/constant";
import Image from "next/image";
import UserData from "./UserData";
import { Href } from "../../utils/constant/index";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { FC, useEffect, useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { UserProfileInterFace } from "../LayoutTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import UserDropDown from "./UserDropDown";
import { fetchUser } from "@/utils/userService";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import LoadingLoader from "../LoadingLoader";

const UserProfile: FC<UserProfileInterFace> = ({ toggle }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropDown = () => setDropDownOpen(!dropDownOpen);
  const { imageLink, backgroundImage } = useSelector(
    (state: RootState) => state.LayoutSlice
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.data);
  const loading = useAppSelector((state) => state.userSlice.loading);
  const [localloading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setLocalLoading(false);
    }
  }, [user]);

  if (loading || localloading) {
    return <LoadingLoader />;
  }

  return (
    <div className="profile-cover bg-size blur-up lazyloaded">
      <CustomImage
        src={`${ImagePath}/${backgroundImage}`}
        className="img-fluid blur-up lazyload bg-img "
        alt="cover"
      />
      <div className="profile-box d-lg-block d-none">
        <div className="profile-content">
          <div className="image-section">
            <div className="profile-img">
              <div className="bg-size blur-up lazyloaded">
                <CustomImage
                  src={`${ImagePath}/${imageLink}`}
                  className="img-fluid blur-up lazyload bg-img "
                  alt="profile"
                />
              </div>
              <span className="stats">
                <Image
                  width={15}
                  height={15}
                  src={`${ImagePath}/icon/verified.png`}
                  className="img-fluid blur-up lazyloaded"
                  alt="verified"
                />
              </span>
            </div>
          </div>
          <div className="profile-detail">
            <h2>
              {user == null ? null : user.name}
              <span>❤</span>
            </h2>
            <h5>{user == null ? null : user.username}</h5>
            <UserData />
            <a href={Href} onClick={toggle} className="btn btn-solid">
              {EditProfile}
            </a>
          </div>
        </div>
      </div>
      <UserDropDown
        dropDownOpen={dropDownOpen}
        toggleDropDown={toggleDropDown}
      />
    </div>
  );
};

export default UserProfile;
