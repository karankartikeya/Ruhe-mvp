import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storiesModalSlice from "./reducers/StoriesModalSlice";
import favouritePageSlice from "./reducers/FavouritePageSlice";
import LayoutSlice from "./reducers/LayoutSlice";
import ShowMorePostSlice from "./reducers/ShowMorePostSlice";
import userSlice from "./reducers/UserSlice";

export const store = configureStore({
  reducer: {
    storiesModalSlice,
    favouritePageSlice,
    LayoutSlice,
    ShowMorePostSlice,
    userSlice
  },
  devTools: true,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
