import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { Href } from "../../../utils/constant";
import { useEffect, useState } from "react";
import ShareModal from "@/Common/CommonPostReact/ShareModal";
import { getDailyQuests } from "@/lib/server/appwrite";
import { useAppSelector } from "@/utils/hooks";
import { formatDistanceToNow } from "date-fns";

type DailyQuestProps = {
  question: string;
  response: string;
  created_at: string;
};

const DailyQuest: React.FC = () => {
  const [moonlight, setMoonlight] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [dailyQuest, setDailyQuest] = useState<DailyQuestProps[]>([]);
  const getTimeDifference = (date: string) => {
    const postDate = new Date(date);
    return formatDistanceToNow(postDate);
  };
  const timeAgo = dailyQuest[0]?.created_at == undefined ? "0" : getTimeDifference(dailyQuest[0]?.created_at);
  const timeDiff = Number(timeAgo.split(" ")[0]);
  // console.log("timeDiff==", timeDiff<1, timeAgo);
  const user = useAppSelector((state) => state.userSlice.data);
  useEffect(() => {
    const fetchDailyQuest = async () => {
      console.log("user==", user);
      const res = await getDailyQuests(user.$id);
      console.log("res==", res, dailyQuest[0]?.created_at);
      res?.map((quest) => {
        // console.log("quest==", quest);
        setDailyQuest((prev) => [
          ...prev,
          {
            question: quest.question,
            response: quest.response,
            created_at: quest.$createdAt,
          },
        ]);
      });
      // const res = await getDailyQuests(user.$id);
      // console.log("res=asa=", dailyQuest[0].created_at);
    };
    fetchDailyQuest();
  }, []);
  return (
    <>
      <li
        onClick={toggleModal}
        className="header-btn quest-btn custom-dropdown"
      >
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
      {timeDiff < 1 ? (
        <ShareModal
          type="submitted"
          showModal={showModal}
          toggleModal={toggleModal}
          question={dailyQuest[0]?.question}
        />
      ) : (
        <ShareModal
          type="notSubmitted"
          showModal={showModal}
          toggleModal={toggleModal}
          question={dailyQuest[0]?.question}
        />
      )}
    </>
  );
};

export default DailyQuest;
