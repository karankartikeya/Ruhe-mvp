"use client";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import AuthenticationMainSection from "@/components/auth/login/AuthenticationMainSection";
import LoginHeaderSection from "@/components/auth/login/LoginHeaderSection";
import LoadingLoader from "@/layout/LoadingLoader";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Media } from "reactstrap";

export default async function Login() {
  useEffect(() => {
    const checkUser = async () => {
      const user = await getLoggedInUser();
      console.log("user=", user);
      if (user) {
        redirect("/newsfeed/style2");
      }
    };
    checkUser();
  }, []);

  return (
    <>
      <LoadingLoader />
      <section className="login-section">
        <LoginHeaderSection />
        <AuthenticationMainSection />
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
    </>
  );
}
