import { CreatePost, GoLive, Href, ImagePath } from "../../utils/constant";
import { FC, useEffect, useRef, useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { Button, Input } from "reactstrap";
import OptionDropDown from "./OptionDropDown";
import SettingsDropDown from "./SettingsDropDown";
import { CreatePostHeaderInterFace } from "../CommonInterFace";
import Image from "next/image";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { BlockToolConstructable } from "@editorjs/editorjs";
import { createPost } from "@/lib/server/appwrite";
import { set } from "lodash";
import { useAppSelector } from "@/utils/hooks";
import { toast } from "react-toastify";

export const MAX_CHARACTERS = 500;

const CreatePostHeader: FC<CreatePostHeaderInterFace> = ({
  writePost,
  setShowPostButton,
}) => {
  const editorInstance = useRef<EditorJS | null>(null);
  const theme = localStorage.getItem("theme");
  const [textTheme, setTextTheme] = useState(theme);
  const [postText, setPostText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  let userName = "";
  let userDetails: string[] = [];
  const user = useAppSelector((state) => state.userSlice.data);
  userName = user.name;
  userDetails.push(userName);
  
  function extractTags(jsonString: string): string[] {
    try {
      // console.log("jsonString", jsonString);
      // Parse the JSON string into an object
      const data = JSON.parse(jsonString);

      // Check if the required structure exists
      if (!data.blocks || !Array.isArray(data.blocks)) {
        throw new Error("Invalid data format");
      }

      // Regex to match hashtags
      const hashtagRegex = /#\w+/g;

      // Extract tags from paragraph blocks
      const tags: string[] = [];

      data.blocks.forEach((block: any) => {
        if (block.type === "paragraph" && block.data?.text) {
          const matches = block.data.text.match(hashtagRegex);
          if (matches) {
            tags.push(...matches);
          }
        }
      });
      setTags(tags);
      return tags;
    } catch (error) {
      console.error("Error extracting tags:", error);
      return [];
    }
  }

  const savePost = async (content: string, hashtag: string[]) => {
    const data = JSON.parse(content);
    
    if (data.blocks.length === 0 || user.userId.length === 0) {
      toast.error("Please write something to post");
      return;
    } else {
      const res = await createPost({
        userId: user.$id,
        content: content,
        tags: hashtag != null ? hashtag : [],
        userDetails: userDetails,
      });
      if (!res) {
        console.log("Post not created");
        toast.error("Error creating post");
      }
      toast.success("Post created successfully");
      editorInstance.current?.clear();
    }
  };

  const handleSubmit = () => {
    let postTextData = "";
    let tagss: string[] = [];
    editorInstance.current?.save().then((outputData) => {
      // console.log(JSON.stringify(outputData));
      // console.log(JSON.stringify(outputData.blocks));
      const newPost = JSON.stringify(outputData);
      postTextData = newPost;
      setPostText(JSON.stringify(outputData));
      tagss = extractTags(JSON.stringify(outputData));
      setTags(tagss);
      // console.log("postText", newPost, " - tags", tagss);
      savePost(newPost, tagss);
      // console.log("tags", extractTags(postText));
    });
    // console.log("postTextData", postTextData.length == 0);
  };

  let isProgrammaticallyUpdating = false;
  useEffect(() => {
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      placeholder: "Let's write an awesome story!",
      tools: {
        header: {
          class: Header as unknown as BlockToolConstructable,
          inlineToolbar: ["link"],
        },
        list: {
          class: List as unknown as BlockToolConstructable,
          inlineToolbar: true,
        },
        paragraph: {
          inlineToolbar: true,
        },
        // image: {
        //   class: ImageTool as unknown as BlockToolConstructable,
        //   config: {
        //     endpoints: {
        //       byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
        //       byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
        //     },
        //   },
        // },
      },
      onChange: async () => {
        if (isProgrammaticallyUpdating) {
          // Skip if triggered by a programmatic update
          isProgrammaticallyUpdating = false;
          return;
        }

        function couldBeCounted(block: any) {
          return "text" in block.data;
        }

        function getBlocksTextLen(blocks: any) {
          return blocks
            .filter(couldBeCounted)
            .reduce((sum: any, block: any) => {
              sum += block.data.text.length;
              return sum;
            }, 0);
        }

        const limit = MAX_CHARACTERS;
        const content = await editorInstance.current?.save();
        const textLength = getBlocksTextLen(content?.blocks);

        if (textLength <= limit) {
          console.log("You can post now");
          return;
        }

        const currentBlockIndex =
          editorInstance.current?.blocks.getCurrentBlockIndex();
        if (currentBlockIndex === undefined) {
          return;
        }

        const currentBlock = content?.blocks[currentBlockIndex];
        if (!currentBlock || !couldBeCounted(currentBlock)) {
          return;
        }

        const otherBlocks = content?.blocks.filter(
          (block: any) => block.id !== currentBlock.id
        );
        const otherBlocksLen = getBlocksTextLen(otherBlocks);
        const remainingCharacters = limit - otherBlocksLen;

        if (currentBlock.data.text.length > remainingCharacters) {
          isProgrammaticallyUpdating = true; // Set flag before programmatic update

          // Trim the text in the current block
          const updatedText = currentBlock.data.text.slice(
            0,
            remainingCharacters
          );

          // Update the block's content in EditorJS
          editorInstance.current?.blocks.update(currentBlock.id!, {
            text: updatedText,
          });

          // Force save to update internal state
          const updatedContent = await editorInstance.current?.save();
          console.log("Updated content after trimming:", updatedContent);

          editorInstance.current?.caret.setToBlock(currentBlockIndex, "end");
          console.log("Content trimmed to fit the limit.");
          console.log("content", content);
        }
      },
    });
    return () => {
      if (
        editorInstance.current &&
        typeof editorInstance.current.destroy === "function"
      ) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);
  return (
    <div className={`static-section ${writePost ? "d-none" : ""}`}>
      <div className="card-title">
        <h3>Create Post</h3>
        <h5> Public </h5>
        {/* <ul className="create-option">
          <li className="options">
            <OptionDropDown />            
          </li>
          <li>
            <h5><DynamicFeatherIcon iconName="Video" className="iw-15" />{GoLive}</h5>
          </li>
        </ul>
        <SettingsDropDown /> */}
      </div>
      <div
        id="editorjs"
        className="input-style icon-right"
        onClick={() => setShowPostButton(true)}
        style={{
          color: "#5f9ea0",
        }}
      >
        {/* <a href={Href}>
          <Image width={14} height={12} src={`${ImagePath}/icon/translate.png`} className="img-fluid blur-up icon lazyloaded" alt="translate"/>
        </a> */}
      </div>
      <div className={`post-btn d-block `}>
        <Button onClick={handleSubmit}>Post</Button>
      </div>
    </div>
  );
};

export default CreatePostHeader;
