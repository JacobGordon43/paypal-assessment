import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Address, Product, UserState} from '../../CustomTypes';
type InitialState = {
    value: UserState;
}



const initialState = {
    value: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: {
            zip: "",
            street: "",
            country: "",
            state: "",
        },
        cart: <Product[]>[]
    }
}

export const user = createSlice({
    name: "user", 
    initialState, 
    reducers: {
        login: (state, action: PayloadAction<UserState>) =>{
            initialState.value.email = action.payload.email;
            initialState.value.firstName = action.payload.firstName;
            initialState.value.lastName = action.payload.lastName;
            initialState.value.address = action.payload.address;
            initialState.value.phoneNumber = action.payload.phoneNumber;
            initialState.value.cart = action.payload.cart;

            return initialState;
        },

        get_user: (state, action: PayloadAction<UserState>)=>{
            return initialState;
        }
    }
})

export const { login } = user.actions;
export default user.reducer