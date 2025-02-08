import CreatePost from "@/Common/CreatePost";
import { FC } from "react";
import PostPanel from "./PostPanel";

const ContentCenter: FC = () => {
  return (
    <div className="content-center">
      <CreatePost />
      <div className="overlay-bg" />
      <PostPanel type="allpost"/>
    </div>
  );
};

export default ContentCenter;
