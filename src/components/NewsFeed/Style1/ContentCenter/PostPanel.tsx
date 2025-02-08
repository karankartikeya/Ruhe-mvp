import SufiyaElizaFirstPost from "./SufiyaElizaFirstPost";
import FriendSuggestion from "./FriendSuggestion";
import SufiyaElizaSecondPost from "./SufiyaElizaSecondPost";
import SufiyaElizaThirdPost from "./SufiyaElizaThirdPost";
import ShowMorePostIcon from "@/Common/ShowMorePostIcon/ShowMorePostIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { styleOneMoreComponent } from "@/Data/NewsFeed";
import { useEffect, useState } from "react";
import { getBookmarks, getInfinitePosts } from "@/lib/server/appwrite";
import { Post } from "../../../../../types";
import PostSection from "./PostSection";
import { BookmarkInterFace } from "@/Common/CommonInterFace";
import { useAppSelector } from "@/utils/hooks";
import { set } from "lodash";

const PostPanel: React.FC<BookmarkInterFace> = ({ type }) => {
  const level = useSelector(
    (state: RootState) => state.ShowMorePostSlice.style1
  );
  const user = useAppSelector((state) => state.userSlice.data);
  const [pageParam, setPageParam] = useState<string | null>(null);
  const [postsData, setPostsData] = useState<any>([]);
  const [bookmarkArray, setBookmarkArray] = useState<any>([]);

  const updateBookmarksLocally = (postId: string, isAdding: boolean) => {
    console.log(`Updating bookmark for postId: ${postId}, isAdding: ${isAdding}`);
    setBookmarkArray((prevBookmarks: any[]) => {
      if (isAdding) {
        return [...prevBookmarks, { postId }]; // Add new bookmark locally
      } else {
        console.log("prevBookmarks==>", prevBookmarks);
        return prevBookmarks.filter((bookmark) => bookmark.postId !== postId); // Remove from UI
      }
    });
    // ✅ Also update postsData to ensure UI re-renders correctly
    setPostsData((prevPosts: any[]) =>
      prevPosts.map((post) =>
        post.$id === postId ? { ...post, isBookmarked: isAdding } : post
      )
    );
  };

  useEffect(() => {
    const getPosts = async () => {
      if (type !== "bookmarks") {
        const posts = await getInfinitePosts({ pageParam });
        const bookmarkedpostIds = await getBookmarks(user.$id);
        setBookmarkArray(bookmarkedpostIds);
        // console.log("bookmarkedposts in client==", bookmarkedposts);
        // posts?.documents.map((post) => {
        //   // console.log("poste==", post);
        // });
        // console.log("posts==", posts?.documents);
        setPostsData(posts?.documents);
        return;
      } else {
        const posts = await getBookmarks(user.$id, "bookmarks");
        // posts?.map((post) => {
        //   console.log("bookmarkedpost from clientside==", post);
        // });
        setPostsData(posts);
        return;
      }
    };
    getPosts();
  }, []);
  const numbers = [1, 2, 3];
  const post = postsData[0] as Post;
  // console.log("bookpost====>==", postsData, type === "bookmarks");
  return (
    <>
    {postsData.length === 0 ? <h1 className="">No BookMarks to Show</h1> : ""}
      <div className="post-panel infinite-loader-sec section-t-space">
        {postsData.map((post: any) => (
          <PostSection
            key={post.$id}
            $id={post.$id}
            userId={post.userId}
            user_details={post.user_details}
            content={post.content}
            tags={post.tags}
            createdAt={post.$createdAt}
            bookmarks={type === "bookmarks" ? null : bookmarkArray}
            updateBookmarksLocally={updateBookmarksLocally}
          />
        ))}
        {/* <FriendSuggestion /> */}
        {/* <SufiyaElizaSecondPost userImage={1} />
        <SufiyaElizaThirdPost userImage={1} iframeLink="https://giphy.com/embed/xl2zRzM8sVo3td58kS"/>
        <SufiyaElizaSecondPost userImage={1} />
        {styleOneMoreComponent.map((data, index) => (level.includes(index) ? data : ""))} */}
      </div>
      {/* <ShowMorePostIcon
        dataLength={styleOneMoreComponent.length}
        value="style1"
      /> */}
    </>
  );
};

export default PostPanel;
