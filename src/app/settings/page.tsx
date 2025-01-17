"use client";
import SettingSection from "@/components/settings/SettingSection";
import CommonLayout from "@/layout/CommonLayout";
import CommonLayoutHeader from "@/layout/CommonLayout/CommonLayoutHeader";
import ThemeCustomizer from "@/layout/CommonLayout/ThemeCustomizer";
import LoadingLoader from "@/layout/LoadingLoader";
import { avatars } from "@/lib/appwrite/config";
import SearchLayoutFooter from "@/layout/SearchLayout/SearchLayoutFooter";
import SubScribeSection from "@/layout/SearchLayout/SubScribeSection";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import React, { useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { fetchUser } from "@/utils/userService";

const Settings = () => {
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
      
      {/* <CommonLayoutHeader headerClassName="header-relative" /> */}
      <SettingSection />
      {/* <SubScribeSection /> */}
      {/* <SearchLayoutFooter /> */}
      {/* <ThemeCustomizer /> */}
    </CommonLayout>
  );
};

export default Settings;
