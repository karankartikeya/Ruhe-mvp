// appwrite.d.ts

export interface User {
  $id: string;
  $permissions?: string[];
  name: string;
  username: string;
  phone: string;
  bio?: string;
  age: number;
  email: string;
  avatar?: string;
  role?: string;
  gender?: string;
  userId: string;
  profileImage?: string;
}

export interface UserUpdate {
  docId: string;
  name: string;
  username?: string;
  phone: string;
  bio?: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Follow {
  $id: string;
  $permissions?: string[];
  followerId: string;
  followingId: string;
}

export interface Post {
  $id: string;
  $permissions?: string[];
  userId?: string; // Relationship to User
  content: string;
  ImageUrl?: string;
  tags?: string[]; // Array of strings
  ImageId?: string;
}

export interface INewPost {
  userId: string;
  content: string;
  tags?: string[];
}

export interface Comment {
  $id: string;
  $permissions?: string[];
  postId?: string; // Relationship to Post
  userId?: string; // Relationship to User
  comment: string;
}

export interface Like {
  $id: string;
  $permissions?: string[];
  postId?: string; // Relationship to Post
  userId?: string; // Relationship to User
}

export type MoodType =
  | "Sad"
  | "Happy"
  | "Excited"
  | "Grateful"
  | "Hopeful"
  | "Proud"
  | "Confident"
  | "Relaxed"
  | "Loving"
  | "Calm"
  | "Bored"
  | "Focused"
  | "Lonely"
  | "Confused"
  | "Fearful"
  | "Irritable"
  | "Nostalgic"
  | "Motivated"
  | "Energetic"
  | "Playful"
  | "Angry"
  | "Guilty"
  | "Inspired";

export interface Mood {
  $id: string;
  $permissions?: string[];
  userId?: string; // Relationship to User
  moodType: MoodType;
  note?: string;
}

export interface DailyQuest {
  $id: string;
  $permissions?: string[];
  question: string;
  response: string;
  points?: string;
  userIds?: string; // Relationship to User
}

// Aggregated types
export interface AppwriteCollections {
  users: User;
  follows: Follow;
  posts: Post;
  comments: Comment;
  likes: Like;
  moods: Mood;
  dailyQuests: DailyQuest;
}
