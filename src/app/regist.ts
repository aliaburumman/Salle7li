import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import themeReducer from "./slices/themeSlice";
import notificationsReducer from "./slices/notificationsSlice";


const regist = configureStore({
  reducer: {
    language:languageReducer,
    theme:themeReducer,
    read:notificationsReducer,
  },
});

export default regist;

export type RootState = ReturnType<typeof regist.getState>;
export type AppDispatch = typeof regist.dispatch;
