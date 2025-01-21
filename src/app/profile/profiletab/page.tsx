"use client";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import ProfileLayout from "@/layout/ProfileLayout";
import { Col, Container, Nav, NavItem, TabContent, TabPane } from "reactstrap";
import { useEffect, useState } from "react";
import { profileNav } from "@/Data/profile";
import TimeLineTabContent from "@/components/profile/ProfileTabs/TimeLineTabContent";
import AboutTabContent from "@/components/profile/ProfileTabs/AboutTabContent";
import FriendListBox from "@/components/profile/FriendListBox";
import CommonGalleryPhotos from "@/Common/CommonGalleryPhotos";
import ActivityFeed from "@/components/profile/ActivityFeed";
import SufiyaElizaFirstPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost";
import Link from "next/link";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { fetchUser } from "@/utils/userService";
import LoadingLoader from "@/layout/LoadingLoader";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/compat/router";
import { useSearchParams } from "next/navigation";

const ProfileTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.data);
  const loading = useAppSelector((state) => state.userSlice.loading);
  const [localloading, setLocalLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkUser = async () => {
      if(router && !router.isReady) {
        try {
          const user = await getLoggedInUser();
          if (!user) {
            router.push("/authentication/login");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          router.push("/authentication/login");
        }
      };
      const search = searchParams.get("search");
      
    };
    checkUser();
  }, [router, searchParams]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setLocalLoading(false);
    }
  }, [user]);

  if (loading || localloading || !user) {
    return <LoadingLoader />;
  }
  return (
    <ProfileLayout profileTab loaderName="profileTimeLine">
      {/* <div className="profile-menu section-t-space">
        <Nav tabs>
          {profileNav.map((data, index) => (
            <NavItem key={index}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  setActiveTab(index + 1); // Set active tab
                }}
                className={`nav-link ${activeTab === index + 1 ? "active" : ""}`}
              >
                <DynamicFeatherIcon
                  iconName={data.icon}
                  className="iw-14 ih-14"
                />
                <h6>{data.title}</h6>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1} className="section-t-space px-0">
          <TimeLineTabContent />
        </TabPane>
        <TabPane tabId={2} className="section-t-space">
          <AboutTabContent />
        </TabPane>
        <TabPane tabId={3} className="section-t-space">
          <Container fluid>
            <div className="page-content">
              <div className="content-center w-100">
                <FriendListBox />
              </div>
            </div>
          </Container>
        </TabPane>
        <TabPane tabId={4} className="section-t-space">
          <Container fluid>
            <div className="page-content">
              <div className="content-center w-100">
                <CommonGalleryPhotos />
              </div>
            </div>
          </Container>
        </TabPane>
        <TabPane tabId={5} className="section-t-space">
          <Container fluid>
            <div className="page-content">
              <Col lg="5" className="content-left">
                <ActivityFeed />
              </Col>
              <Col
                lg="7"
                className="content-center d-none d-xl-block about-profile-item"
              >
                <div className="post-panel">
                  <div className="post-wrapper">
                    <SufiyaElizaFirstPost mainImage={1} userImage={1} />
                  </div>
                </div>
              </Col>
            </div>
          </Container>
        </TabPane>
      </TabContent> */}
    </ProfileLayout>
  );
};

export default ProfileTab;
