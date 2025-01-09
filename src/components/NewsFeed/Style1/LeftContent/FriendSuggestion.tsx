import { FC, useEffect, useState } from "react";
import FriendSuggestionHeader from "./FriendSuggestionHeader";
import { ActiveNow, ImagePath } from "../../../../utils/constant";
import { friendSuggestionSlider } from "@/Data/NewsFeed";
import { FriendSuggestionInterFace } from "../Style1Types";
import Slider from "react-slick";
import { friendSuggestionSliderOption } from "@/Data/SliderOptions";
import { getUsers } from "@/lib/server/appwrite";

export type FriendSuggestionProps = {
  userId: string;
  name: string;
  profileImage: string;
  email: string;
  username: string;
};

const FriendSuggestion: FC<FriendSuggestionInterFace> = ({ mainClassName }) => {
  const [users, setUsers] = useState<FriendSuggestionProps[]>([]);

  useEffect(() => {
    // Fetch Users
    const fetchUsers = async () => {
      const res = await getUsers(7);
      res?.map((user) => {
        setUsers((prev) => [
          ...prev,
          {
            userId: user.$id,
            name: user.name,
            profileImage: user.profileImage,
            email: user.email,
            username: user.username,
          },
        ]);
      });
    };
    fetchUsers();

    // setUsers();
  }, []);


  // console.log("userssss=", users[0]);

  return (
    <div
      className={`suggestion-box section-t-space ${
        mainClassName ? mainClassName : ""
      }`}
    >
      <FriendSuggestionHeader />
      <div className="suggestion-content ratio_115">
        <Slider
          {...friendSuggestionSliderOption}
          className="slide-2 default-space"
        >
          {users.map((data, index) => (
            <div key={index}>
              <div className="story-box">
                <div className={`adaptive-overlay skin-overlay`} />
                <div
                  className="story-bg bg-size"
                  style={{
                    backgroundImage: `url(https://cloud.appwrite.io/v1/avatars/initials?name=${data.name})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    display: "block",
                  }}
                />
                <div className="story-content">
                  <h6>{data.name}</h6>
                  <span>{data.username}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FriendSuggestion;
