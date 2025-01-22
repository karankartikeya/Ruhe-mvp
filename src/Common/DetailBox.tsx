import { FC, useEffect, useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { DetailBoxProps } from "./CommonInterFace";
import { ImagePath, PeopleReactThisPost } from "../utils/constant";
import CustomImage from "./CustomImage";
import { toast } from "react-toastify";
import {
  createBookmarks,
  deleteBookmark,
  getInfinitePosts,
} from "@/lib/server/appwrite";
import { Post } from "../../types";
import RenderEditorContent from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost/PostDetails/RenderEditorContent";
import { useAppSelector } from "@/utils/hooks";
import { debounce } from "lodash";  // Import debounce

const DetailBox: FC<DetailBoxProps> = ({ postId, postContent }) => {
  const [bookMarkActive, setBookMarkActive] = useState(false);
  const [pageParam, setPageParam] = useState<string | null>(null);
  const [postsData, setPostsData] = useState<any>([]);
  const user = useAppSelector((state) => state.userSlice.data);
  let [bookmarkId, setBookmarkId] = useState<string | null>(null);
  let [bookmarkArray, setBookmarkArray] = useState<any>([]);

  useEffect(() => {
    let parsedBookMarks = user?.bookmarks.map((item: any) => JSON.parse(item));
    setBookmarkArray(parsedBookMarks);
    let isBookmarked = parsedBookMarks.find(
      (bookmark: any) => bookmark.postId === postId
    );
    if (isBookmarked) {
      setBookMarkActive(true);
      setBookmarkId(isBookmarked?.bookmarkId);
    } else {
      setBookMarkActive(false);
    }
  }, [user, postId]);

  const handleSubmitDebounced = debounce(async () => {
    if (bookMarkActive) {
      setBookMarkActive(false);
      bookmarkArray = bookmarkArray.filter(
        (bookmark: any) => bookmark.bookmarkId !== bookmarkId
      );
      // console.log("bookMarkId==>==>", bookmarkId);
      bookmarkArray = bookmarkArray.map((item: any) => JSON.stringify(item));
      const deletedBookmark = await deleteBookmark(bookmarkId!, bookmarkArray, user?.$id);
      if (!deletedBookmark) {
        toast.error("something went wrong");
      }
      // toast.error("already bookmarked");
      return;
    } else {
      setBookMarkActive(true);
      const bookmark = await createBookmarks(
        user?.$id,
        postId,
        user?.bookmarks
      );
      if (!bookmark) {
        toast.error("something went wrong");
      }
    }
  }, 500); // 500ms debounce delay

  return (
    <div className="detail-box">
      <RenderEditorContent content={postContent} />
      <div
        className={`bookmark favorite-btn ${bookMarkActive ? "active" : ""}`}
      >
        <DynamicFeatherIcon
          iconName="Bookmark"
          className="iw-14 ih-14"
          onClick={() => {
            handleSubmitDebounced(); // Use debounced function
          }}
        />
      </div>
    </div>
  );
};

export default DetailBox;
