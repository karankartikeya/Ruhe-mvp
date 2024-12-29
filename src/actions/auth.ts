"use server";
//build two functions one for login and logout using appwrite that I can just run directly after getting called from a client component.

import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/server/const";
import { ID } from "node-appwrite";

import { redirect } from "next/navigation";

export const login = async (email: string, password: string) => {
  console.log("runnning code");
  const { account } = await createAdminClient();
  const result = await account.createEmailPasswordSession(email, password);
  console.log("result data....", result);
  (await cookies()).set(SESSION_COOKIE, result.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  if (result) {
    console.log("success result data....", result);
    redirect("/newsfeed/style2");
  } else {
    console.log("err result data....", result);
  }
  console.log("result data....", result);
};

export const logout = async () => {
  const { account } = await createSessionClient();
  (await cookies()).delete(SESSION_COOKIE);
  await account.deleteSession("current");
  redirect("/authentication/login");
};

//signup function

export const signup = async (email: string, password: string, name: string) => {
  const { account } = await createAdminClient();
  await account.create(ID.unique(), email, password, name);
  const result = await account.createEmailPasswordSession(email, password);
  (await cookies()).set(SESSION_COOKIE, result.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  if (result) {
    redirect("/newsfeed/style2");
  } else {
    console.log("err result data....", result);
  }
};
