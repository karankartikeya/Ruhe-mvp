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
  avatars,
  databases,
  storage,
  users,
} from "../appwrite/config";
import { error } from "console";
import { DailyQuestResponse, INewPost, Post, UserUpdate } from "../../../types";

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
    const encodedName = encodeURIComponent(name);
    const avatarURL = `https://cloud.appwrite.io/v1/avatars/initials?name=${encodedName}`;
    if (!newAccount) throw Error;
    const newUser = await saveUser({
      userId: newAccount.$id,
      name,
      email,
      username,
      phone,
      age,
      gender,
      profileImage: avatarURL,
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

export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );
    console.log("users", users.documents);
    if (!users) throw Error;

    return users.documents;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user: UserUpdate) {
  // const hasFileToUpdate = user.file.length > 0;
  try {
    //   let image = {
    //     imageUrl: user.imageUrl,
    //     imageId: user.imageId,
    //   };

    //   if (hasFileToUpdate) {
    //     // Upload new file to appwrite storage
    //     const uploadedFile = await uploadFile(user.file[0]);
    //     if (!uploadedFile) throw Error;

    //     // Get new file url
    //     const fileUrl = getFilePreview(uploadedFile.$id);
    //     if (!fileUrl) {
    //       await deleteFile(uploadedFile.$id);
    //       throw Error;
    //     }

    //     image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    //   }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.docId,
      {
        name: user.name,
        phone: user.phone,
        email: user.email,
      }
    );

    // Failed to update
    // if (!updatedUser) {
    //   // Delete new file that has been recently uploaded
    //   if (hasFileToUpdate) {
    //     await deleteFile(image.imageId);
    //   }
    //   // If no new file uploaded, just throw error
    //   throw Error;
    // }

    // // Safely delete old file after successful update
    // if (user.imageId && hasFileToUpdate) {
    //   await deleteFile(user.imageId);
    // }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

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
  profileImage: string;
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
  /** DELETE USER */
}

export const deleteUser = async (docId: string, userId: string) => {
  try {
    console.log("docId", docId);
    console.log("userId", userId);
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      docId
    );
    if (!statusCode) return null;
    const deleteUser = await users.delete(userId);
    if (!deleteUser) return null;
    return { status: "Ok" };
  } catch (error) {
    console.log("Error while deleting user", error);
  }
};

//===================CRUD OPERATIONS FOR POSTS===================

{
  /** CREATE POST */
}
export const createPost = async (post: INewPost) => {
  try {
    // //upload File to appwrite storage
    // const uploadedFile = await uploadFile(post.file[0]);
    // if (!uploadedFile) throw Error;

    // //Get file url
    // const fileUrl = getFilePreview(uploadedFile.$id);
    // if (!fileUrl) {
    //   await deleteFile(uploadedFile.$id);
    //   throw Error;
    // }
    // //convert tags to array

    // const tags = post.tags?.replace(/ /g, "").split(",") || [];
    //create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        userId: post.userId,
        content: post.content,
        tags: post.tags,
        user_details: post.userDetails,
      }
    );
    if (!newPost) {
      // await deleteFile(uploadedFile.$id);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log("Error while creating post", error);
  }
};

{
  /** SEARCH POSTS */
}
export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

{
  /** GET POSTS */
}

export const getInfinitePosts = async ({
  pageParam,
}: {
  pageParam?: string | null;
}) => {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(2)];
  const user = await getLoggedInUser();
  if (!user) return null;
  else if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }
  // const userId = user.userId;
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
  /** GET TRENDING TOPICS and Number of posts associated with each topic
   */
}

export async function getTrendingTopics() {
  //get it from table collection named trendingTopics
  //it has field hashtags which is an array of strings and has 5 most talked topics as of now therefore get the first 5 elements of the array and return the number of posts linked with each hashtag

  const trendingTopics = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.trendingTopicsCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(1)]
  );
  // console.log("trendingTopics", trendingTopics);
  if (!trendingTopics) throw Error;
  const trendingTopicsData = trendingTopics.documents[0];
  // console.log("trendingTopicsData", trendingTopicsData);
  const hashtags = trendingTopicsData.hashtags;
  const trendingTopicsArray = [];
  for (let i = 0; i < hashtags.length; i++) {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("tags", hashtags[i])]
    );
    trendingTopicsArray.push({ hashtag: hashtags[i], posts: posts.total });
  }
  return trendingTopicsArray;
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
export async function getFilePreview(fileId: string) {
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
export const createDailyQuest = async (dailyQuest: DailyQuestResponse) => {
  try {
    console.log("dailyQuest in api", dailyQuest);
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
        userIds: dailyQuest.userId,
        question: dailyQuest.question,
        response: dailyQuest.response,
        points: String(points),
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
      [Query.orderDesc("$createdAt")]
      // [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
    );
    console.log("desc", dailyQuests);
    const filteredDailyQuests = dailyQuests.documents.filter(
      (quest) => quest.userIds["$id"] === userId
    );
    if (!dailyQuests) throw Error;
    console.log("dailyQuests", filteredDailyQuests[0]);
    return filteredDailyQuests;
  } catch (error) {
    console.log("Error while fetching daily quests", error);
  }
};

export const createBookmarks = async (
  userId: string,
  postId: string,
  bookmarks: string[]
) => {
  try {
    console.log("entered the jungle with values=>", userId, postId, bookmarks);
    const newBookmark = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarksCollectionId,
      ID.unique(),
      {
        userId: userId,
        postId: postId,
      }
    );
    if (!newBookmark) throw Error;
    console.log("calling save bookmark with id=>", newBookmark.$id);
    const saveBookmarktoUser = await saveBookmarktoUserBookmarks(
      postId,
      userId,
      newBookmark.$id,
      bookmarks
    );
    return saveBookmarktoUser;
  } catch (error) {
    console.log("Error while creating bookmark", error);
  }
};

export const saveBookmarktoUserBookmarks = async (
  postId: string,
  userId: string,
  bookmarkId: string,
  bookmarks: string[]
) => {
  try {
    console.log("entered the saving jungle with values=>", postId, userId, bookmarkId);
    const newBookmark = {postId: postId, bookmarkId: bookmarkId};
    const stringifiedBookmarks = JSON.stringify(newBookmark);
    bookmarks.push(stringifiedBookmarks);
    console.log("bookmarks got stringed", bookmarks);
    const saveBookmarktoUserBookmark = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        bookmarks: bookmarks,
      }
    );
    return saveBookmarktoUserBookmark;
  } catch (error) {
    console.log("Error while saving bookmark to user bookmarks", error);
  }
};

export const deleteBookmark = async (bookmarkId: string, userbookmarks:string[], userId:string) => {
  try {
    console.log("entered the jungle with values=>", bookmarkId, userbookmarks, userId);
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarksCollectionId,
      bookmarkId
    );
    if (!statusCode) throw Error;
    console.log("status code==>", statusCode);
    const deleteBookmarkUserDb = await deleteBookmarkFromUser(userId, userbookmarks);
    return deleteBookmarkUserDb;
    return { status: "Ok" };
  } catch (error) {
    console.log("Error while deleting bookmark", error);
  }
};

export const deleteBookmarkFromUser = async (userId: string,bookmarks: string[]) => {
  try {
    console.log("entered the saving deletejungle with values=>", userId, bookmarks);
    const saveBookmarktoUserBookmark = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        bookmarks: bookmarks,
      }
    );
    console.log("saveBookmarktoUserBookmark==>", saveBookmarktoUserBookmark);
    return saveBookmarktoUserBookmark;
  } catch (error) {
    console.log("Error while deleting bookmark from user bookmarks", error);
  }
}


export const getBookmarks = async (userId: string) => {
  try {
    const bookmarks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarksCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    const filteredBookmarks = bookmarks.documents.filter(
      (bookmark) => bookmark.userId["$id"] === userId
    );
    if (!bookmarks) throw Error;
    console.log("bookmarks==>", filteredBookmarks);
    //fetch posts with this postId
    // const bookmarkedPosts = [];
    // for (let i = 0; i < filteredBookmarks.length; i++) {
    //   const post = await databases.getDocument(
    //     appwriteConfig.databaseId,
    //     appwriteConfig.postCollectionId,
    //     filteredBookmarks[i].postId["$id"]
    //   );
    //   bookmarkedPosts.push(post);
    // }
    // return bookmarkedPosts;
    return filteredBookmarks;
  } catch (error) {
    console.log("Error while fetching bookmarks", error);
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
