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
import { debounce } from "lodash"; // Import debounce

const DetailBox: FC<DetailBoxProps> = ({ postId, postContent, bookmarks }) => {
  const [bookMarkActive, setBookMarkActive] = useState(true);
  // const [pageParam, setPageParam] = useState<string | null>(null);
  // const [postsData, setPostsData] = useState<any>([]);
  const user = useAppSelector((state) => state.userSlice.data);
  let [bookmarkId, setBookmarkId] = useState<string | null>(null);
  let [bookmarkArray, setBookmarkArray] = useState(bookmarks);
  console.log("bookmarkArray==>", bookmarkArray);

  const handleSubmitDebounced = debounce(async () => {
    if (bookMarkActive) {
      setBookMarkActive(false);
      bookmarkArray = bookmarkArray?.filter(
        (bookmark: any) => bookmark.bookmarkId !== bookmarkId
      );
      // console.log("bookMarkId==>==>", bookmarkId);
      const deletedBookmark = await deleteBookmark(bookmarkId!, user?.$id);
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
      );
      if (!bookmark) {
        toast.error("something went wrong");
      }
    }
  }, 500); // 500ms debounce delay

  useEffect(() => {
    let isBookmarked = bookmarkArray?.find((bookmark: any) => {
      return bookmark.postId.$id == postId;
    });
    console.log("isBookmarked==>", isBookmarked, typeof bookmarkArray);
    if (isBookmarked) {
      setBookMarkActive(true);
    } else {
      setBookMarkActive(false);
    }
  }, [bookmarkArray]);

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
