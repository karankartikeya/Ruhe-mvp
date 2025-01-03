import { AppDispatch } from "@/redux-toolkit/store";
import {
  getUserStart,
  getUserSuccess,
  getUserFailure,
} from "@/redux-toolkit/reducers/UserSlice";
import { getLoggedInUser } from "@/lib/server/appwrite";

export const fetchUser = () => async (dispatch: AppDispatch): Promise<boolean> => {
  dispatch(getUserStart());
  try {
    const user = await getLoggedInUser();
    
    if (!user) {
      dispatch(getUserFailure("User not found"));
      return false;
    }
    
    dispatch(getUserSuccess(user));
    return true;
    
  } catch (error) {
    console.error("Failed to fetch user:", error);
    dispatch(getUserFailure("Failed to fetch user. Please try again later."));
    return false;
  }
};
