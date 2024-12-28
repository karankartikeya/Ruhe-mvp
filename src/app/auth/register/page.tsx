"use client";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import RegisterMainPage from "@/components/auth/Register/RegisterMainPage";
import LoginHeaderSection from "@/components/auth/login/LoginHeaderSection";
import ThemeCustomizer from "@/layout/CommonLayout/ThemeCustomizer";
import LoadingLoader from "@/layout/LoadingLoader";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Media } from "reactstrap";

const RegisterPage = () => {
  useEffect(() => {
    const checkUser = async () => {
      const user = await getLoggedInUser();
      if (user) {
        redirect("/newsfeed/style2");
      }
    };
    checkUser();
  }
  , []);
  return (
    <>
      <LoadingLoader />
      <section className="login-section">
        <LoginHeaderSection />
        <RegisterMainPage />
        <div className="how-work">
          <Media>
            <DynamicFeatherIcon iconName="PlayCircle" />
            <Media body>
              <h2>how it work?</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been.
              </p>
            </Media>
          </Media>
        </div>
      </section>
      <ThemeCustomizer/>
    </>
  );
};

export default RegisterPage;
