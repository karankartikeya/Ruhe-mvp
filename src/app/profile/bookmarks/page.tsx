"use client";
import CreatePost from "@/Common/CreatePost";
import PostPanel from "@/components/NewsFeed/Style1/ContentCenter/PostPanel";
import SufiyaElizaFirstPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost";
import SufiyaElizaSecondPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaSecondPost";
import SufiyaElizaThirdPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaThirdPost";
import EventsCard from "@/components/NewsFeed/Style1/ContentRight/EventsCard";
import Gallery from "@/components/NewsFeed/Style1/ContentRight/Gallery";
import FriendSuggestion from "@/components/NewsFeed/Style1/LeftContent/FriendSuggestion";
import LikePage from "@/components/NewsFeed/Style1/LeftContent/LikePage";
import SufiyaElizaMultiplePost from "@/components/NewsFeed/Style3/ContentCenter/SufiyaElizaMultiplePost";
import AboutUser from "@/components/profile/AboutUser";
import ActivityFeeds from "@/components/profile/ActivityFeeds";
import CollegeMeetCard from "@/components/profile/CollegeMeetCard";
import WorldWideTrend from "@/components/profile/WorldWideTrend";
import LoadingLoader from "@/layout/LoadingLoader";
import ProfileLayout from "@/layout/ProfileLayout";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchUser } from "@/utils/userService";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";

const ProfileBookmarks = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.data);
  const loading = useAppSelector((state) => state.userSlice.loading);
  const [localloading, setLocalLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getLoggedInUser();
      // console.log("user=", user);
      if (!user) {
        redirect("/authentication/login");
      }
    };
    checkUser();
  }, []);

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
    <ProfileLayout title="bookmarks" loaderName="profileTimeLine">
      <Container fluid className="section-t-space px-0 ">
        <div className="page-content">
          <div className="content-left">
            <AboutUser />
            {/* <FriendSuggestion mainClassName="d-xl-block d-none" /> */}

            {/** build the below UI for liked */}
            <div className="sticky-top d-xl-block d-none">
              <LikePage />
            </div>
          </div>
          <div className="content-center">
            {/* <CreatePost /> */}
            <div className="overlay-bg" />
            {/** build the below UI for users posts */}
            <div className="post-panel infinite-loader-sec section-t-space">
              <PostPanel type="bookmarks" />
            </div>
          </div>

          <div className="content-right d-xl-block d-none">
            {/* Daily Quest update
            If answered then yippe otherwise please answer now
              */}
            <CollegeMeetCard />
            {/* <Gallery />
            <ActivityFeeds /> */}
            <div className="sticky-top">
              {/* <EventsCard eventImage={12} diffrentPath="post" /> */}
              <WorldWideTrend />
            </div>
          </div>
        </div>
      </Container>
    </ProfileLayout>
  );
};

export default ProfileBookmarks;
