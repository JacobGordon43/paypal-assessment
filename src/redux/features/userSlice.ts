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
            city: ""
        },
        cart: {products: <Product[]>[], totalPrice: 0}
    }
}

export const user = createSlice({
    name: "user", 
    initialState, 
    reducers: {
        login: (state, action: PayloadAction<UserState>) =>{
            state.value.email = action.payload.email;
            state.value.firstName = action.payload.firstName;
            state.value.lastName = action.payload.lastName;
            state.value.address = action.payload.address;
            state.value.phoneNumber = action.payload.phoneNumber;
            state.value.cart = action.payload.cart;
        },

        get_user: (state, action: PayloadAction<UserState>)=>{
            return initialState;
        }
    }
})

export const { login, get_user } = user.actions;
export default user.reducer