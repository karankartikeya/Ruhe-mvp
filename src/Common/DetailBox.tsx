import { FC, useEffect, useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { DetailBoxProps } from "./CommonInterFace";
import { ImagePath, PeopleReactThisPost } from "../utils/constant";
import CustomImage from "./CustomImage";
import { toast } from "react-toastify";
import {
  createBookmarks,
  deleteBookmark,
  deleteBookmarkUsingPostId,
  getInfinitePosts,
} from "@/lib/server/appwrite";
import { Post } from "../../types";
import RenderEditorContent from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost/PostDetails/RenderEditorContent";
import { useAppSelector } from "@/utils/hooks";
import { debounce } from "lodash"; // Import debounce

const DetailBox: FC<
  DetailBoxProps 
> = ({ postId, postContent, bookmarks }) => {
  const [bookMarkActive, setBookMarkActive] = useState(true);
  // const [pageParam, setPageParam] = useState<string | null>(null);
  // const [postsData, setPostsData] = useState<any>([]);
  const user = useAppSelector((state) => state.userSlice.data);
  let [bookmarkId, setBookmarkId] = useState<string | null>(null);
  let bookmarkArray = bookmarks;
  console.log("bookmarkArray==>", bookmarks);

  const handleSubmitDebounced = debounce(async () => {
    if (bookmarks != null) {
      console.log("calling this function 1");
      if (bookMarkActive) {
        console.log("calling this function 1 subfun1");
        setBookMarkActive(false);
        bookmarkArray = bookmarkArray?.filter(
          (bookmark: any) => bookmark.postId.$id == postId
        );
        // console.log("bookMarkId==>==>", bookmarkArray[0].$id);
        const deletedBookmark = await deleteBookmark(
          //@ts-ignore
          bookmarkArray[0].$id!,
          user?.$id
        );
        if (!deletedBookmark) {
          toast.error("something went wrong");
        }

        // updateBookmarksLocally(postId, !bookMarkActive); // Update UI locally
        // toast.error("already bookmarked");
        return;
      } else {
        console.log("calling this function 1 subfun2 ");
        setBookMarkActive(true);
        const bookmark = await createBookmarks(user?.$id, postId);
        if (!bookmark) {
          toast.error("something went wrong");
        }
        // updateBookmarksLocally(postId, bookMarkActive); // Update UI locally
      }
    } else {
      console.log("calling this function 2");
      if (bookMarkActive) {
        console.log("calling this function 2 subfun1");
        setBookMarkActive(false);
        const deletedBookmark = await deleteBookmarkUsingPostId(
          postId,
          user?.$id
        );
        if (!deletedBookmark) {
          toast.error("something went wrong");
        }
        // updateBookmarksLocally(postId, !bookMarkActive); // Update UI locally
        // toast.error("already bookmarked");
        return;
      } else {
        console.log("calling this function 2 subfun2");
        setBookMarkActive(true);
        const bookmark = await createBookmarks(user?.$id, postId);
        if (!bookmark) {
          toast.error("something went wrong");
        }
        // updateBookmarksLocally(postId, bookMarkActive); // Update UI locally
      }
    }
  }, 500); // 500ms debounce delay

  useEffect(() => {
    if (bookmarks) {
      let isBookmarked = bookmarks?.find((bookmark: any) => {
        return bookmark.postId.$id == postId;
      });
      console.log("isBookmarked==>", isBookmarked, bookmarkArray, postId);
      if (isBookmarked) {
        setBookMarkActive(true);
      } else {
        setBookMarkActive(false);
      }
    } else {
      setBookMarkActive(true);
      console.log("isBookmarked==>", postId);
    }
  }, [bookmarks]);

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
