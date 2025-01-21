import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import ShareModalHeader from "./ShareModalHeader";
import UserDropDown from "./UserDropDown";
import { ImagePath, sharePost } from "../../utils/constant";
import { ShareModalProps } from "../CommonInterFace";
import CustomImage from "../CustomImage";
import { useAppSelector } from "@/utils/hooks";
import { createDailyQuest, getDailyQuests } from "@/lib/server/appwrite";
import { toast } from "react-toastify";

type DailyQuestProps = {
  question: string;
  response: string;
};
const ShareModal: FC<ShareModalProps> = ({ type, showModal, toggleModal }) => {
  const [dailyQuest, setDailyQuest] = useState<DailyQuestProps[]>([]);
  const [response, setResponse] = useState<string>("");
  const user = useAppSelector((state) => state.userSlice.data);
  // console.log("userout==", dailyQuest);
  const loading = useAppSelector((state) => state.userSlice.loading);
  const handleSubmission = async () => {
    const feedDailyQues = await createDailyQuest({
      question: dailyQuest[0]?.question,
      userId: user.$id,
      response: response,
    });
    if (!feedDailyQues) {
      console.log("Error submitting daily quest", feedDailyQues);
      toast.error("Error submitting daily quest");
    }
    else{
      toast.success("Daily quest submitted successfully");
    }
  };
  useEffect(() => {
    // console.log("user==", user);
    const fetchDailyQuest = async () => {
      console.log("user==", user);
      const res = await getDailyQuests(user.$id);
      console.log("res==", res);
      res?.map((quest) => {
        setDailyQuest((prev) => [
          ...prev,
          {
            question: quest.question,
            response: quest.response,
          },
        ]);
      });
      // const res = await getDailyQuests(user.$id);
      // console.log("res==", res);
    };
    fetchDailyQuest();
  }, []);

  return (
    <Modal
      isOpen={showModal}
      toggle={toggleModal}
      centered
      modalClassName="mobile-full-width"
      contentClassName="share-modal"
    >
      <ModalHeader toggle={toggleModal}>
        <ShareModalHeader />
      </ModalHeader>
      <ModalBody>
        <UserDropDown />

        <div className="post-section ratio2_1">
          <div className="post-img bg-size blur-up lazyloaded">
            <CustomImage
              src={`${ImagePath}/post/1.jpg`}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
          </div>
          <div className="post-content">
            <h3>
              <u>Ques:</u> {dailyQuest[0]?.question}
            </h3>
            <h5 className="tag">
              <span>#ourcutepuppy</span>
            </h5>
          </div>
        </div>
        <div className="input-section">
          <Input
            type="text"
            className="emojiPicker"
            value={response}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setResponse(event.target.value)
            }
            placeholder="write your daily quest.."
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="solid" onClick={handleSubmission}>Submit</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ShareModal;
