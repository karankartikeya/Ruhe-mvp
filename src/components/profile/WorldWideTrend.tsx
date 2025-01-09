import { Href, Post, WorldWideTrends } from "../../utils/constant";
import DynamicFeatherIcon from "../../Common/DynamicFeatherIcon";
import CommonDropDown from "@/Common/CommonDropDown";
import { worldWideTrendData, activityFeedData } from "@/Data/profile";
import { useAppDispatch } from "@/utils/hooks";
import { useEffect, useState } from "react";
import { getTrendingTopics } from "@/lib/server/appwrite";
import { Models } from "node-appwrite";

type TrendingTopics = {
  hashtag: string;
  posts: number;
};

const WorldWideTrend: React.FC = () => {
  const dispatch = useAppDispatch();
  //define a variable in this format :trendingTopicsArray.push({ hashtag: hashtags[i], posts: posts })

  const [trendingTopicsArray, setTrendingTopicsArray] = useState<
    TrendingTopics[]
  >([]);
  useEffect(() => {
    const trendTopics = async () => {
      const res = await getTrendingTopics();
      // console.log("res==", res);
      res?.map((topic) => {
        setTrendingTopicsArray((prev) => [
          ...prev,
          {
            hashtag: topic.hashtag,
            posts: topic.posts,
          },
        ]);
      });
    };

    if (trendingTopicsArray.length === 0) {
      trendTopics();
    } else return;
  }, []);

  return (
    <div className="hashtag-list section-t-space">
      <div className="card-title">
        <h3>{WorldWideTrends}</h3>
        {/* <div className="settings">
          <div className="setting-btn">
            <a href={Href} className="d-flex">
              <DynamicFeatherIcon iconName="RotateCw" className="icon icon-theme stroke-width-3 iw-11 ih-11"/>
            </a>
          </div>
          <div className="setting-btn setting-dropdown">
            <CommonDropDown mainClassName="icon-dark stroke-width-3 icon iw-11 ih-11" mainIcon="Sun" menuList={activityFeedData}/>
          </div>
        </div> */}
      </div>
      <div className="hashtag-content">
        <ul>
          {trendingTopicsArray.map((topic, index) => (
            <li key={index}>
              <a href={Href}>
                <span>{topic.hashtag}</span>
                <h6>
                  <DynamicFeatherIcon iconName="Mail" className="iw-11 ih-11" />
                  {topic.posts}
                  {Post}
                </h6>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorldWideTrend;
