import { ChangeEvent, FC, useEffect, useState } from "react";
import { CommentSectionInterFace } from "../CommonInterFace";
import DynamicFeatherIcon from "../DynamicFeatherIcon";
import MainComment from "./MainComment";
import SubComment from "./SubComment";
import { LoadMoreReplies, PostComment } from "../../utils/constant";
import { Input } from "reactstrap";
import { Href } from "../../utils/constant/index";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { createComment, getComments } from "@/lib/server/appwrite";
import { useAppSelector } from "@/utils/hooks";
import { toast } from "react-toastify";

const CommentSection: FC<CommentSectionInterFace> = ({
  showComment,
  postId,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const user = useAppSelector((state) => state.userSlice.data);
  const [comments, setComments] = useState<any>([]);



  const handleCommentSubmit = async () => {
    const commentSubmit = await createComment({
      userId: user.$id,
      postId: postId,
      comment: messageInput,
    });
    if (!commentSubmit) {
      console.log("Comment not submitted", commentSubmit);
      toast.error("Something went wrong");
    } else {
      setMessageInput("");
      console.log("Comment Submitted", messageInput);
    }
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const addEmoji = (emoji: EmojiClickData) => {
    setMessageInput(messageInput + emoji.emoji);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments(postId);
      console.log("comments==", comments);
      setComments(comments?.documents);
    };
    fetchComments();
  }, [showComment]);

  return (
    <div className="comment-section">
      <div className={`comments ${showComment ? "d-block" : ""}`}>
        {comments.map((comment: any) => (
          <div key={comment.$id} className="main-comment">
            <MainComment message={comment.comment} username={comment.userId["name"]} id="fourthComment" timeofComment={comment.$createdAt} />
            {/* <div className="sub-comment">
             <a href={Href} className="loader">
            <DynamicFeatherIcon iconName="RotateCw" className="iw-15 ih-15" />
            {LoadMoreReplies}
          </a>
          </div> */}
          </div>
        ))}
      </div>
      <div className="reply">
        <div className="search-input input-style input-lg icon-right">
          <Input
            type="text"
            className="emojiPicker comment-bg"
            placeholder="write a comment.."
            value={messageInput}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setMessageInput(event.target.value)
            }
          />
          {showEmojiPicker ? <Picker onEmojiClick={addEmoji} /> : null}
          <a
            href="#"
            onClick={handleCommentSubmit}
            className="post-icon icon-3 "
          >
            Post
          </a>
          {/* <a href={Href}>
            <DynamicFeatherIcon
              iconName="Smile"
              className="icon icon-2 iw-20 ih-20"
              onClick={toggleEmojiPicker}
            />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
