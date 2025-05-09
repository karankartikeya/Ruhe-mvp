"use client";
import CompanyAboutUs from "@/components/Company/AboutUs/CompanyAboutUs";
import CompanyFeatures from "@/components/Company/AboutUs/CompanyFeatures";
import FriendBookTeam from "@/components/Company/AboutUs/FriendBookTeam";
import Blogs from "@/components/Company/Home/Blogs";
import CompanyLayout from "@/layout/CompanyLayout";
import React, { useEffect } from "react";

const CompanyAbout = () => {
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  return (
    <CompanyLayout title="About Us" activeNav="about">
      <CompanyAboutUs />
      <CompanyFeatures />
      <FriendBookTeam />
      <Blogs />
    </CompanyLayout>
  );
};

export default CompanyAbout;
