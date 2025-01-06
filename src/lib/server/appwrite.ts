"use server";
import {
  Client,
  Account,
  ID,
  Query,
  Databases,
  ImageGravity,
} from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./const";
import { redirect } from "next/navigation";
import {
  account,
  appwriteConfig,
  databases,
  storage,
} from "../appwrite/config";
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

//===================CRUD OPERATIONS FOR POSTS===================

{
  /** CREATE POST */
}
export const createPost = async (post: any) => {
  try {
    //upload File to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;

    //Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    //convert tags to array

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        userId: post.userId,
        content: post.content,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        tags: tags,
      }
    );
    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log("Error while creating post", error);
  }
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
  /** GET POST BY POST ID */
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
  /** GET RECENT POSTS */
}
export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

{
  /** UPDATE POST */
}
export async function updatePost(post: any) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        content: post.content,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

{
  /** DELETE POST */
}
export async function deletePost(postId?: string, imageId?: string) {
  if (!postId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

//===================CR OPERATIONS FOR MOODS===================
//===================NO UD OPERATIONS FOR MOODS as of now===================

{
  /** CREATE MOOD */
}
export const createMood = async (mood: any) => {
  try {
    //create mood
    const newMood = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.moodsCollectionId,
      ID.unique(),
      {
        userId: mood.userId,
        moodType: mood.moodType,
        note: mood.note,
      }
    );
    if (!newMood) throw Error;
    return newMood;
  } catch (error) {
    console.log("Error while creating mood", error);
  }
};

{
  /** GET MOODS */
}
export const getMoods = async (userId: string) => {
  try {
    const moods = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.moodsCollectionId,
      [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
    );
    if (!moods) throw Error;
    return moods;
  } catch (error) {
    console.log("Error while fetching moods", error);
  }
};

//===================CR OPERATIONS FOR Daily QUESTS===================

{
  /** CREATE DAILY QUEST */
}
export const createDailyQuest = async (dailyQuest: any) => {
  try {
    //generate random points based on the time of submission
    //if submitted before 12pm, points will be between 6-10
    //if submitted after 12pm, points will be between 1-5
    const date = new Date();
    const hours = date.getHours();
    const points =
      hours < 12
        ? Math.floor(Math.random() * 5) + 6
        : Math.floor(Math.random() * 5) + 1;

    //create daily quest
    const newDailyQuest = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.dailyQuestsCollectionId,
      ID.unique(),
      {
        userId: dailyQuest.userId,
        question: dailyQuest.question,
        response: dailyQuest.response,
        points: points,
      }
    );
    if (!newDailyQuest) throw Error;
    return newDailyQuest;
  } catch (error) {
    console.log("Error while creating daily quest", error);
  }
};

{
  /** GET DAILY QUESTS */
}

export const getDailyQuests = async (userId: string) => {
  try {
    const dailyQuests = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.dailyQuestsCollectionId,
      [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
    );
    if (!dailyQuests) throw Error;
    return dailyQuests;
  } catch (error) {
    console.log("Error while fetching daily quests", error);
  }
};









//===================VAlIDATION FUNCTIONS===================

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
