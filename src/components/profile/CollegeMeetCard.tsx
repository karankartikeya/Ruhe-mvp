import CustomImage from "@/Common/CustomImage";
import {
  CollegeMeet,
  ImagePath,
  People,
  TodayYourCollageGroupMeeting,
} from "../../utils/constant";
import { Href } from "../../utils/constant/index";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import CommonDropDown from "@/Common/CommonDropDown";
import { collageDropDown } from "@/Data/profile";
import { FormEvent, useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchUser } from "@/utils/userService";
import { getDailyQuests } from "@/lib/server/appwrite";
import LoadingLoader from "@/layout/LoadingLoader";

type DailyQuestProps = {
  question: string;
  response: string;
};

const CollegeMeetCard: React.FC = () => {
  let numbers = [3, 5, 2, 1];
  const dispatch = useAppDispatch();
  const [dailyQuest, setDailyQuest] = useState<DailyQuestProps[]>([]);
  const user = useAppSelector((state) => state.userSlice.data);
  console.log("userout==", dailyQuest);
  const loading = useAppSelector((state) => state.userSlice.loading);
  useEffect(() => {
    // console.log("user==", user);
    const fetchDailyQuest = async () => {
      console.log("user==", user);
      const res = await getDailyQuests(user.$id);
      console.log("res==", res);
      res?.map((quest) => {
        setDailyQuest((prev) => [
          ...prev,
          {
            question: quest.question,
            response: quest.response,
          },
        ]);
      });
      // const res = await getDailyQuests(user.$id);
      // console.log("res==", res);
    };
    fetchDailyQuest();
  }, []);

  return (
    <div className="birthday-section event-sec bg-size blur-up lazyloaded">
      <CustomImage
        src={`${ImagePath}/event-bg.jpg`}
        className="img-fluid blur-up lazyload bg-img d-none"
        alt="birthday"
      />
      <div className="birthday-top">
        <div className="title">
          <h1>Daily Quest</h1>
          <h6></h6>
        </div>
        {/* <div className="setting">
          <div className="setting-btn light-btn">
            <a href={Href} className="d-flex">
              <DynamicFeatherIcon iconName="RotateCw" className="iw-11 ih-11 icon icon-light stroke-width-3"/>
            </a>
          </div>
          <div className="setting-btn light-btn ms-2 setting-dropdown">
            <CommonDropDown mainClassName="icon-light stroke-width-3 iw-12 ih-12" mainIcon="Sun" menuList={collageDropDown}/>
          </div>
        </div> */}
      </div>
      <div className="birthday-content">
        <div className="image-section">
          <div className="event-group">
            {numbers.map((data, index) => (
              <div
                key={index}
                className="center-profile bg-size blur-up lazyloaded"
              >
                <CustomImage
                  src={`${ImagePath}/user-sm/${data}.jpg`}
                  className="img-fluid blur-up lazyload bg-img"
                  alt="user"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="details">
          <h3>
            <DynamicFeatherIcon
              iconName="User"
              className="icon-light me-2 stroke-width-3 iw-12 ih-12"
            />
            56 {People}
          </h3>
          <h6>glasgow, scotland</h6>
          <h2>Ques: {dailyQuest[0]?.question}?</h2>
          {dailyQuest[0]?.response == null ? (
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
            >
              <Input type="text" placeholder="send invitation" />
              <Button>
                <DynamicFeatherIcon
                  iconName="ArrowRight"
                  className="iw-13 ih-13 icon-light icon stroke-width-3"
                />
              </Button>
            </form>
          ) : (
            <>
              <h3>Ans. {dailyQuest[0]?.response}</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeMeetCard;
