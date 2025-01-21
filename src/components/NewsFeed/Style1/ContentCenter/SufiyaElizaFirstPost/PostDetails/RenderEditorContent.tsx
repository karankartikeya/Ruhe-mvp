import React from "react";
import { OutputData } from "@editorjs/editorjs"; // Importing the OutputData type from Editor.js

const RenderEditorContent: React.FC<{ content: OutputData }> = ({ content }) => {
  const renderListItems = (items: any[]) => {
    return items.map((item, i) => (
      <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
    ));
  };

  return (
    <div>
      {content.blocks.map((block, index) => {
        switch (block.type) {
          case "header":
            return (
              <h3
                key={index}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            ); // Support HTML (e.g., <a>) in headers
          case "paragraph":
            return (
              <p
                key={index}
                className="list-postdata"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            ); // HTML rendering in paragraphs
          case "list":
            const ListTag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={index} className="list-postdata">
                {renderListItems(block.data.items)} {/* Render all list items */}
              </ListTag>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default RenderEditorContent;
