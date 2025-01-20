import { useEffect, useState } from "react";
import { OutputData } from "@editorjs/editorjs"; // Importing the OutputData type from Editor.js

const RenderEditorContent: React.FC<{ content: OutputData }> = ({ content }) => {
  return (
    <div>
      {content.blocks.map((block, index) => {
        switch (block.type) {
          case "header":
            return <h3 key={index}>{block.data.text}</h3>;
          case "paragraph":
            return <p key={index}>{block.data.text}</p>;
          case "list":
            return (
              <ul key={index}>
                {block.data.items.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};


export default RenderEditorContent;
