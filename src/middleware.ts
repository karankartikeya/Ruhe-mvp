// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   if (path.split("/")[1] !== "authentication" &&!request.cookies.has("token")) {
//     return NextResponse.redirect(new URL("/authentication/login", request.url));
//   }
//   if (path.split("/")[1] === "authentication" && request.cookies.has("token")) {
//     return NextResponse.redirect(new URL(`/newsfeed/style1`, request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/auth/:path*",
//     "/authentication/:path*",
//     "/birthday",
//     "/company/:path*",
//     "/element/:path*",
//     "/event",
//     "/favourite/:path*",
//     "/games",
//     "/helpandsupport",
//     "/helparticle",
//     "/messanger",
//     "/music",
//     "/newsfeed/:path*",
//     "/pagelist",
//     "/profile/:path*",
//     "/settings",
//     "/weather",
//   ],
// };


// import { withAuth } from "next-auth/middleware";
// import { pagesOptions } from "./app/api/auth/[...nextauth]/pages-options";

// export default withAuth({
//   pages: {
//     ...pagesOptions,
//   },
// });
  
 
// export const config = {
//   // restricted routes
//   matcher: [
//     "/:path*"
//   ],
// };



import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/server/const"; // Your session cookie name
import { createSessionClient, getLoggedInUser } from "./lib/server/appwrite";

export async function middleware(request: NextRequest) {
//   const session = request.cookies.get(SESSION_COOKIE);
// console.log("session",session);
//   if (!session) {
//     // Redirect to login if no session
//     const url = new URL("/authentication/login", request.url);
//     return NextResponse.redirect(url);
//   }
const user = await getLoggedInUser();
const {account} = await createSessionClient();
if (!user) {
  request.cookies.delete(SESSION_COOKIE);
  account.deleteSession("current");
  const response = NextResponse.redirect(new URL("/authentication/login", request.url));
  return response;
}

  // Allow request to proceed if session exists
  return NextResponse.next();
}

// Apply to specific routes
export const config = {
  matcher: [
    "/",   // Protect newsfeed routes
  ],
};
