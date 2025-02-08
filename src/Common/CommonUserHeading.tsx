import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { FC, useState } from "react";
import { Dropdown, Media, DropdownToggle, DropdownMenu } from "reactstrap";
import { Href, ImagePath } from "../utils/constant/index";
import { postDropDownOption } from "@/Data/NewsFeed";
import { CommonUserHeadingProps } from "./CommonInterFace";
import CustomImage from "./CustomImage";
import HoverMessage from "./HoverMessage";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const CommonUserHeading: FC<CommonUserHeadingProps> = ({ name, time }) => {
  const [showOption, setShowOption] = useState(false);

  return (
    <div className="post-title">
      <div className="profile">
        <Media>
          <a
            className="popover-cls user-img bg-size blur-up lazyloaded"
            href={Href}
            id={name}
          >
            <CustomImage
              src={"https://cloud.appwrite.io/v1/avatars/initials?name=karan"}
              className="img-fluid blur-up lazyload bg-img"
              alt="user"
            />
          </a>
          <Media body>
            <h5>{name}</h5>
            <h6>posted {time}</h6>
          </Media>
        </Media>
        {/* <HoverMessage
          placement={"right"}
          target="SufiyaElizaFirstPost"
          name={"sufiya eliza"}
          imagePath="https://cloud.appwrite.io/v1/avatars/initials?name=karan"
        /> */}
      </div>
      <div className="setting-btn ms-auto setting-dropdown no-bg">
        <Dropdown
          isOpen={showOption}
          toggle={() => setShowOption(!showOption)}
          className="custom-dropdown arrow-none dropdown-sm btn-group"
        >
          <DropdownToggle color="transparent">
            <div>
              <DynamicFeatherIcon
                iconName="MoreHorizontal"
                className="icon icon-font-color iw-14"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            
            <ul>
              {/* {postDropDownOption.map((data, index) => (
                <li key={index}>
                  <a href={Href}>
                    <DynamicFeatherIcon
                      iconName={data.iconName}
                      className="icon icon-font-color iw-14"
                    />
                    {data.post}
                  </a>
                </li>
              ))} */}

              <li>
                <FacebookShareButton
                  url={"google.com"}
                  className="Demo__some-network__share-button"
                >
                 <FacebookIcon size={32} round />
                </FacebookShareButton>
              </li>
              <li>
                <WhatsappShareButton
                  url={"google.com"}
                  title={"Newpost"}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </li>
            </ul>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default CommonUserHeading;
