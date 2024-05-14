import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type initialType={
    lightMode:boolean,
}
const initialValue:initialType = {
    lightMode :false,
}
const themeSlice = createSlice({
    name: "lightMode",
    initialState: initialValue,
    reducers: {
implementTheme:(state:initialType,action:PayloadAction<boolean>)=>{
            state.lightMode = action.payload;


}
    }
})
export default themeSlice.reducer;
export const {implementTheme} = themeSlice.actions;

