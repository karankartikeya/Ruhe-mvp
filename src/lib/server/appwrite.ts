"use server";
import { Client, Account, ID, Query, Databases } from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./const";
import { redirect } from "next/navigation";
import { appwriteConfig, databases } from "../appwrite/config";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const session = (await cookies()).get(SESSION_COOKIE);
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

{
  /** SIGNUP FUNCTION */
}
export const signup = async (
  email: string,
  password: string,
  name: string,
  phone: string,
  age: number,
  gender: string,
  username: string
) => {
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

{
  /** LOGIN FUNCTION */
}
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

{
  /** LOGOUT FUNCTION */
}
export const logout = async () => {
  const { account } = await createSessionClient();
  (await cookies()).delete(SESSION_COOKIE);
  await account.deleteSession("current");
  redirect("/authentication/login");
};

{
  /** SAVE USER TO DB */
}
export const saveUser = async (user: {
  name: string;
  email: string;
  userName: string;
  phone: string;
  age: number;
  gender: string;
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log("Error while saving user to db", error);
  }
};

{
  /** CHECK USERNAME IS UNIQUE OR NOT FROM DB*/
}
export const checkUsername = async (username: string) => {
  const checkUsernameData = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("username", username)]
  );
  console.log("checkUsernamessss", checkUsernameData.documents);
  return checkUsernameData.documents.length === 0;
};
