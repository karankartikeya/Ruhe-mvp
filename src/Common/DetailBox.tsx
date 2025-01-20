import { FC, useEffect, useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { DetailBoxProps } from "./CommonInterFace";
import { ImagePath, PeopleReactThisPost } from "../utils/constant";
import CustomImage from "./CustomImage";
import { toast } from "react-toastify";
import { getInfinitePosts } from "@/lib/server/appwrite";
import { Post } from "../../types";
import RenderEditorContent from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost/PostDetails/RenderEditorContent";

const DetailBox: FC<DetailBoxProps> = ({ postContent }) => {
  const [bookMarkActive, setBookMarkActive] = useState(false);
  const [pageParam, setPageParam] = useState<string | null>(null);
  const [postsData, setPostsData] = useState<any>([]);
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const posts = await getInfinitePosts({ pageParam });
  //     posts?.documents.map((post) => {
  //       // console.log("poste==", post);
  //     });
  //     // console.log("posts==", posts?.documents);
  //     setPostsData(posts?.documents);
  //   };
  //   getPosts();
  // }, []);
  const numbers = [1, 2, 3];
  // const post = postsData[0] as Post;
  // console.log("post====>==", post);
  return (
    <div className="detail-box">
      <RenderEditorContent content={postContent} />
      {/* <div
        className={`bookmark favorite-btn ${bookMarkActive ? "active" : ""}`}
      >
        <DynamicFeatherIcon
          iconName="Bookmark"
          className="iw-14 ih-14"
          onClick={() => {
            setBookMarkActive(!bookMarkActive);
            toast.success(`${bookMarkActive ? "un-" : ""}bookmark successful`);
          }}
        />
      </div> */}
      {/* <div className="people-likes">
        <ul>
          {numbers.map((data, index) => (
            <li key={index} className="popover-cls bg-size blur-up lazyloaded">
              <CustomImage
                src={`${ImagePath}/user-sm/${data}.jpg`}
                className="img-fluid blur-up lazyload bg-img"
                alt="image"
              />
            </li>
          ))}
        </ul>
        <h6>+12 {PeopleReactThisPost}</h6>
      </div> */}
    </div>
  );
};

export default DetailBox;
