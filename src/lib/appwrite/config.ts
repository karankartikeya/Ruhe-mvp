import { Client, Account, Databases, Storage, Avatars } from "node-appwrite";

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  postCollectionId: process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID!,
  likesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_LIKES_COLLECTION_ID!,
  dailyQuestsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DAILY_QUESTS_COLLECTION_ID!,
  moodsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MOODS_COLLECTION_ID!,
  commentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
  followersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FOLLOWERS_COLLECTION_ID!,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url!);
client.setProject(appwriteConfig.projectId!);
client.setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

