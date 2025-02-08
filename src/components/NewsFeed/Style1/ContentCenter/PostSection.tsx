import CommonLikePanel from "@/Common/CommonLikePanel";
import CommonPostReact from "@/Common/CommonPostReact";
import CommonUserHeading from "@/Common/CommonUserHeading";
import DetailBox from "@/Common/DetailBox";
import {
  CelebrationNewAlbum,
  CelebrationSpan,
} from "../../../../utils/constant";
import { FC } from "react";
import { SufiyaElizaSecondPostInterFace } from "../Style1Types";
import { Post } from "../../../../../types";
import { formatDistanceToNow } from "date-fns";
import { getTimeDifference } from "@/utils/validators";

const PostSection: FC<Post & { updateBookmarksLocally: (postId: string, isAdding: boolean) => void }> = ({
  $id,
  userId,
  user_details,
  content,
  tags,
  createdAt,
  bookmarks,
  updateBookmarksLocally
}) => {
  const contentFix = JSON.parse(content!);
  const timeAgo = getTimeDifference(createdAt!);
  console.log("boooook=>",bookmarks)
  // const profileName =user_details[0];
  return (
    <div className="post-wrapper col-grid-box section-t-space d-block">
      <CommonUserHeading name={user_details![0]} time={timeAgo} />
      <div className="post-details">
        <DetailBox
          postId={$id}
          postContent={contentFix}
          bookmarks={bookmarks}
          updateBookmarksLocally={updateBookmarksLocally}
        />
        {/* <CommonLikePanel /> */}
        <CommonPostReact postId={$id} />
      </div>
    </div>
  );
};

//https://cloud.appwrite.io/v1/avatars/initials?name=${user.name}

export default PostSection;
