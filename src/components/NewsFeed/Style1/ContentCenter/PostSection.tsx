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

const PostSection: FC<Post> = ({
  $id,
  userId,
  user_details,
  content,
  tags,
  createdAt,
  bookmarks,
}) => {
  const getTimeDifference = (date: string) => {
    const postDate = new Date(date);
    return formatDistanceToNow(postDate, { addSuffix: true });
  };
  const contentFix = JSON.parse(content!);
  const timeAgo = getTimeDifference(createdAt!);
  // const profileName =user_details[0];
  return (
    <div className="post-wrapper col-grid-box section-t-space d-block">
      <CommonUserHeading name={user_details![0]} time={timeAgo} />
      <div className="post-details">
        <DetailBox
          postId={$id}
          postContent={contentFix}
          bookmarks={bookmarks}
        />
        {/* <CommonLikePanel /> */}
        <CommonPostReact postId={$id} />
      </div>
    </div>
  );
};

//https://cloud.appwrite.io/v1/avatars/initials?name=${user.name}

export default PostSection;
