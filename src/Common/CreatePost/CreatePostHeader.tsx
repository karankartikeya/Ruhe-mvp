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

const CreatePostHeader: FC<CreatePostHeaderInterFace> = ({
  writePost,
  setShowPostButton,
}) => {
  const editorInstance = useRef<EditorJS | null>(null);
  const theme = localStorage.getItem("theme");
  const [textTheme, setTextTheme] = useState(theme);

  const handleSubmit = () => {
    editorInstance.current?.save().then((outputData) => {
      console.log(outputData);
      console.log(JSON.stringify(outputData.blocks));
    });
  };

  useEffect(() => {
    editorInstance.current = new EditorJS({
      holderId: "editorjs",
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
