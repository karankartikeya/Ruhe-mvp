"use client";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/newsfeed/style2");
  // }, [router]);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getLoggedInUser();
      if (user) {
        router.push("/newsfeed/style2");
      }
      else{
        router.push("/authentication/login");
      }
    };
    checkUser();
  }
  , []);
  return (
    <main></main>
  )
}

export default page