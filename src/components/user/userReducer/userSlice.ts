import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
	personalInfo?: {
		name?: string;
		dob?: string;
		sex?: string;
		mobile?: string;
		governmentId_Type?: string;
		governmentId?: string;
	};
	personalAddress?: {
		address?: string;
		state?: string;
		city?: string;
		country?: string;
		pincode?: string;
	};
}

const initialState: UserState = {
	personalInfo: {
		name: "",
		dob: "",
		sex: "",
		mobile: "",
		governmentId_Type: "",
		governmentId: "",
	},
	personalAddress: {
		address: "",
		state: "",
		city: "",
		country: "",
		pincode: "",
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<UserState>) => {
			state.personalAddress = {
				...state.personalAddress,
				...action.payload.personalAddress,
			};
			state.personalInfo = {
				...state.personalInfo,
				...action.payload.personalInfo,
			};
		},
	},
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
