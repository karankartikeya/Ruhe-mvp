import { Href, ImagePath, Replay, Translate } from "../../utils/constant";
import { FC } from "react";
import { Media } from "reactstrap";
import { Like } from "../../utils/constant/index";
import CustomImage from "../CustomImage";
import { MainCommentProps } from "../CommonInterFace";
import HoverMessage from "../HoverMessage";
import { formatDistanceToNow } from "date-fns";
import { getTimeDifference } from "@/utils/validators";

const MainComment: FC<MainCommentProps> = ({ message, like,id, username, timeofComment }) => {
  // const getTimeDifference = (date: string) => {
  //   const postDate = new Date(date);
  //   return formatDistanceToNow(postDate, { addSuffix: true });
  // };
  const timePost = getTimeDifference(timeofComment!);
  return (
    <Media>
      <a href={Href} className="user-img popover-cls bg-size blur-up lazyloaded" id={id}>
        <CustomImage src={`${ImagePath}/user-sm/2.jpg`} className="img-fluid blur-up lazyload bg-img" alt="user"/>
      </a>
      <HoverMessage placement={"right"} target={id} name={"sufiya elija"} imagePath={`user-sm/2.jpg`} />
      <Media body>
        <a href={Href}>
          <h5>{username}</h5>
        </a>
        <p>{message}</p>
        {/* <ul className="comment-option">
          <li><a href={Href}>{Like} {like ? `(${like})` : ""}</a></li>
          <li><a href={Href}>{Replay}</a></li>
          <li><a href={Href}>{Translate}</a></li>
        </ul> */}
      </Media>
      <div className="comment-time">
        <h6>{timePost}</h6>
      </div>
    </Media>
  );
};

export default MainComment;
