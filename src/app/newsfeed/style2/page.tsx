"use client";
import ContentCenter from "@/components/NewsFeed/Style1/ContentCenter";
import ContentLeft from "@/components/NewsFeed/Style1/LeftContent";
import CollegeMeetCard from "@/components/profile/CollegeMeetCard";
import WorldWideTrend from "@/components/profile/WorldWideTrend";
import CommonLayout from "@/layout/CommonLayout";
import LoadingLoader from "@/layout/LoadingLoader";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchUser } from "@/utils/userService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const newsFeedStyle2 = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.data);
  const loading = useAppSelector((state) => state.userSlice.loading);
  const [localloading, setLocalLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
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
    checkUser();
  }, [router]);

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
            </div>
          </div>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default newsFeedStyle2;
