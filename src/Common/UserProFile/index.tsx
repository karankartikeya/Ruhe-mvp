import { Href, ImagePath, ViewProfile } from "../../utils/constant/index";
import Link from "next/link";
import ProfileSetting from "./ProfileSetting";
import CounterStats from "./CounterStats";
import Image from "next/image";
import CustomImage from "../CustomImage";
import { useAppSelector } from "@/utils/hooks";
import LoadingLoader from "@/layout/LoadingLoader";

const UserProFile = () => {
  const user = useAppSelector((state) => state.userSlice.data);
  const loading = useAppSelector((state) => state.userSlice.loading);
  if (!user || loading) {
    return <LoadingLoader />;
  }
  return (
    <div className="profile-box">
      {/* <ProfileSetting /> */}
      <div className="profile-content">
        <Link href="/profile/timeline" className="image-section">
          <div className="profile-img">
            <div className="bg-size blur-up lazyloaded">
              <CustomImage
                src={`https://cloud.appwrite.io/v1/avatars/initials?name=${user.name}`}
                className="img-fluid blur-up bg-img lazyloaded"
                alt="profile"
              />
            </div>
            {/* <span className="stats">
              <Image
                width={15}
                height={15}
                src={`${ImagePath}/icon/verified.png`}
                className="img-fluid blur-up lazyloaded"
                alt="verified"
              />
            </span> */}
          </div>
        </Link>
        <div className="profile-detail">
          <Link href="/profile">
            <h2>
              {user.name}
              <span>❤</span>
            </h2>
          </Link>
          <h5>{user.username}</h5>
          <div className="description">
            <p>{user.bio}</p>
          </div>
          {/* <CounterStats /> */}
          <a href="/profile/timeline" className="btn btn-solid">
            {ViewProfile}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProFile;
