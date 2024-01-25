import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {UserState} from "./userSlice";

export interface AllUserState {
    allUsers: UserState[];
    open: boolean
}

const initialState: AllUserState = {
    allUsers: [],
    open: false
};

export const allUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        allUsers: (state, action: PayloadAction<AllUserState>) => {
            state.allUsers.push(...action.payload.allUsers);
        },

        setOpen: (state, action:PayloadAction<boolean>) => {
            state.open = action.payload
        }
    },
});

export const {allUsers, setOpen} = allUserSlice.actions;

export default allUserSlice.reducer;
