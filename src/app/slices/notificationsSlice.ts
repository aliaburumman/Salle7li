import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type initialType={
    isRead:boolean,
}
const initialValue:initialType = {
    isRead :false,
}
const notificationsSlice = createSlice({
    name: "arabic",
    initialState: initialValue,
    reducers: {
implementRead:(state:initialType,action:PayloadAction<boolean>)=>{
            state.isRead = action.payload;


}
    }
})
export default notificationsSlice.reducer;
export const {implementRead} = notificationsSlice.actions;

