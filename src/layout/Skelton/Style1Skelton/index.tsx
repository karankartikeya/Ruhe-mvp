import CommonLayoutHeader from "@/layout/CommonLayout/CommonLayoutHeader";
import { LoadingLoaderProps } from "@/layout/LayoutTypes";
import LoaderHoc from "@/utils/LoaderHoc";
import { Container } from "reactstrap";
import LayoutSideBar from "../../CommonLayout/LayoutSideBar/index";
import ConversationPanel from "../common/ConversationPanel";
import StorySection from "../common/StorySection";
import ProfileBox from "../common/ProfileBox";
import SuggestionBox from "../common/SuggestionBox";
import LikePage from "../common/LikePage";
import BirthdayReminder from "../common/BirthdayReminder";
import GallerySection from "../common/GallerySection";
import ContentCenter from "../common/ContentCenter";
const Style1Skelton: React.FC<LoadingLoaderProps> = ({ show }) => {
  return (
    <div className={`pre-loader ${show ? "d-block" : "d-none"}`}>
      <CommonLayoutHeader headerClassName="" />
      <Container fluid className={`page-body  custom-padding`}>
        <LayoutSideBar sideBarClassName="" />
        <div className="page-center">
          {/* <StorySection /> */}
          <Container fluid className="section-t-space px-0 layout-default">
            <div className="page-content">
              <div className="content-left">
                <ProfileBox />
                <SuggestionBox />
                <LikePage />
              </div>
              <ContentCenter/>
              <div className="content-right">
                <BirthdayReminder />
                <GallerySection />
                <SuggestionBox />
              </div>
            </div>
          </Container>
        </div>
        {/* <ConversationPanel /> */}
      </Container>
    </div>
  );
};

export default LoaderHoc(Style1Skelton);
