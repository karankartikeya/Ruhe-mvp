import SufiyaElizaFirstPost from "./SufiyaElizaFirstPost";
import FriendSuggestion from "./FriendSuggestion";
import SufiyaElizaSecondPost from "./SufiyaElizaSecondPost";
import SufiyaElizaThirdPost from "./SufiyaElizaThirdPost";
import ShowMorePostIcon from "@/Common/ShowMorePostIcon/ShowMorePostIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { styleOneMoreComponent } from "@/Data/NewsFeed";
import { useEffect, useState } from "react";
import { getInfinitePosts } from "@/lib/server/appwrite";
import { Post } from "../../../../../types";
import PostSection from "./PostSection";

const PostPanel: React.FC = () => {
  const level = useSelector(
    (state: RootState) => state.ShowMorePostSlice.style1
  );
  const [pageParam, setPageParam] = useState<string | null>(null);
  const [postsData, setPostsData] = useState<any>([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getInfinitePosts({ pageParam });
      posts?.documents.map((post) => {
        console.log("poste==", post);
      });
      console.log("posts==", posts?.documents);
      setPostsData(posts?.documents);
    };
    getPosts();
  }, []);
  const numbers = [1, 2, 3];
  const post = postsData[0] as Post;
  console.log("post====>==", post);
  return (
    <>
      <div className="post-panel infinite-loader-sec section-t-space">
        {postsData.map((post: any) => (
          <PostSection
            $id={post.$id}
            userId={post.userId}
            user_details={post.user_details}
            content={post.content}
            tags={post.tags}
            createdAt={post.$createdAt}
          />
        ))}
        <FriendSuggestion />
        {/* <SufiyaElizaSecondPost userImage={1} />
        <SufiyaElizaThirdPost userImage={1} iframeLink="https://giphy.com/embed/xl2zRzM8sVo3td58kS"/>
        <SufiyaElizaSecondPost userImage={1} />
        {styleOneMoreComponent.map((data, index) => (level.includes(index) ? data : ""))} */}
      </div>
      <ShowMorePostIcon
        dataLength={styleOneMoreComponent.length}
        value="style1"
      />
    </>
  );
};

export default PostPanel;
