import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type initialType={
    isArabic:boolean,
}
const initialValue:initialType = {
    isArabic :false,
}
const languageSlice = createSlice({
    name: "arabic",
    initialState: initialValue,
    reducers: {
implementLanguage:(state:initialType,action:PayloadAction<boolean>)=>{
            state.isArabic = action.payload;


}
    }
})
export default languageSlice.reducer;
export const {implementLanguage} = languageSlice.actions;

