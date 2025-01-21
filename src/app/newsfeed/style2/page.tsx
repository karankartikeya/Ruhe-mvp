"use client";
import ContentCenter from "@/components/NewsFeed/Style1/ContentCenter";
import EventsCard from "@/components/NewsFeed/Style1/ContentRight/EventsCard";
import Gallery from "@/components/NewsFeed/Style1/ContentRight/Gallery";
import YourGames from "@/components/NewsFeed/Style1/ContentRight/YourGames";
import ContentLeft from "@/components/NewsFeed/Style1/LeftContent";
import StorySection from "@/components/NewsFeed/Style1/StorySection";
import CollegeMeetCard from "@/components/profile/CollegeMeetCard";
import WorldWideTrend from "@/components/profile/WorldWideTrend";
import CommonLayout from "@/layout/CommonLayout";
import LoadingLoader from "@/layout/LoadingLoader";
import { avatars } from "@/lib/appwrite/config";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchUser } from "@/utils/userService";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";

const newsFeedStyle2 = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.data);
  const loading = useAppSelector((state) => state.userSlice.loading);
  const [localloading, setLocalLoading] = useState(false);
  const avatarUrl = avatars.getInitials("karan");
  // const ava = avatarUrl.then((res) => console.log(res));
  console.log("userava=", avatarUrl);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getLoggedInUser();
      // console.log("user==", user);
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
    <CommonLayout
      mainClass="custom-padding"
      headerClassName="header-light"
      sideBarClassName="sidebar-white"
      loaderName="style2"
      differentLogo="logo-color.png"
    >
      <div className="page-center">
        <Container fluid className="section-t-space px-0 layout-default">
          <div className="page-content">
            <ContentLeft />
            <ContentCenter />
            <div className="content-right">
              <CollegeMeetCard />
              <WorldWideTrend />

              {/** Give this an adspace or for an event */}
              
              {/* <div className="sticky-top">
                <EventsCard eventImage={1} />
                <YourGames />
              </div> */}
            </div>
          </div>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default newsFeedStyle2;