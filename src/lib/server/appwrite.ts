"use server";
import { Client, Account, ID, Query, Databases } from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./const";
import { redirect } from "next/navigation";
import { account, appwriteConfig, databases } from "../appwrite/config";
import { error } from "console";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const session = (await cookies()).get(SESSION_COOKIE);
  if (!session || !session.value) {
    console.log("No active session");
    return {
      get account() {
        return new Account(client);
      },
    };
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

// export async function createAdminClient() {
//   const client = new Client()
//     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
//     .setKey(process.env.NEXT_APPWRITE_KEY!);

//   return {
//     get account() {
//       return new Account(client);
//     },
//   };
// }

// export async function getAccount() {
//   try {
//     const currAccount = await account.get();
//     return currAccount;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getLoggedInUser() {
//   try {
//     console.log("checking");
//     // const { account } = await createSessionClient();
//     const user = await getAccount();
//     if (!user) throw error;
//     const currentUser = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("userId", user.$id)]
//     );
//     if (!currentUser) throw error;
//     return currentUser.documents[0];
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

export async function getAccount() {
  try {
    // Check for an active session before fetching account details
    const { account } = await createSessionClient();
    const session = await account.getSession("current");
    if (!session) {
      console.log("No active session");
      return null;
    }
    const currAccount = await account.get();
    return currAccount;
  } catch (error) {
    console.log("Error fetching account: ", error);
    return null;
  }
}

export async function getLoggedInUser() {
  try {
    console.log("Checking for logged-in user...");
    const user = await getAccount();
    if (!user) {
      console.log("User not logged in");
      return null;
    }
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("userId", user.$id)]
    );
    if (currentUser.documents.length === 0) {
      console.log("User not found in database");
      return null;
    }
    return currentUser.documents[0];
  } catch (error) {
    console.log("Error in getLoggedInUser: ", error);
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
  // const { account } = await createAdminClient();
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;
    const newUser = await saveUser({
      userId: newAccount.$id,
      name,
      email,
      username,
      phone,
      age,
      gender,
    });
    return newUser;
  } catch {
    return error;
  }
  // const result = await account.createEmailPasswordSession(email, password);
  // console.log("result", result);
  // const setCookie = (await cookies()).set(SESSION_COOKIE, result.secret, {
  //   path: "/",
  //   httpOnly: true,
  //   sameSite: "strict",
  //   secure: true,
  // });
  // if (setCookie) {
  //   redirect("/newsfeed/style2");
  // } else {
  //   console.log("err result data....", result);
  //   return error;
  // }
};

{
  /** LOGIN FUNCTION */
}
export const login = async (email: string, password: string) => {
  try {
    console.log("runnning code");
    // const { account } = await createAdminClient();
    const result = await account.createEmailPasswordSession(email, password);
    console.log("result data....", result);
    const session = (await cookies()).set(SESSION_COOKIE, result.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    // if (result) {
    //   console.log("success result data....", result);
    //   redirect("/newsfeed/style2");
    // } else {
    //   console.log("err result data....", result);
    // }
    // console.log("result data....", result);
    return result;
  } catch {
    console.log("error");
    return null;
  }
};

{
  /** SIGNIN FUNCTION EXPLICITLY USED ONLY FOR LOGIN PAGE AS OF NOW */
}
export const signin = async (email: string, password: string) => {
  try {
    console.log("runnning code");
    // const { account } = await createAdminClient();
    const result = await account.createEmailPasswordSession(email, password);
    console.log("result data....", result);
    const session = (await cookies()).set(SESSION_COOKIE, result.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    const currUser = await getLoggedInUser();
    if (currUser) {
      return currUser !== null;
    } else {
      console.log("err result data....", result);
      return null;
    }
    // if (result) {
    //   console.log("success result data....", result);
    //   redirect("/newsfeed/style2");
    // } else {
    //   console.log("err result data....", result);
    // }
    // console.log("result data....", result);
  } catch {
    console.log("error");
    return null;
  }
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
  userId: string;
  name: string;
  email: string;
  username: string;
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

{
  /** CHECK IF PHONENUMBER IS ALREADY REGISTERED */
}

export const checkPhone = async (phone: string) => {
  const checkPhoneData = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("phone", phone)]
  );
  console.log("checkPhone", checkPhoneData.documents);
  return checkPhoneData.documents.length === 0;
};

{
  /** GET POSTS */
}

export const getInfinitePosts = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(7)];
  const user = await getLoggedInUser();
  if (!user) return null;
  else if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }
  const userId = user.userId;
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log("Error while fetching posts", error);
  }
};

{
  /** GET POST BY ID */
}

export const getPostById = async (postId: string) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );
    if (!post) throw Error;
    return post;
  } catch (error) {
    console.log("Error while fetching post by id", error);
  }
};

{
  /** UPDATE POST */
}
export const updatePost = async (postId: string, post: any) => {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      post
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log("Error while updating post", error);
  }
}