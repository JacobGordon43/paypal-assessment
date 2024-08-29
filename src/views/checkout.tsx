import React, {useState} from 'react';
import {TextField} from "@mui/material";
import { UserState } from '../CustomTypes';
import { AppDispatch, useAppSelector } from '../redux/store';
import { get_user } from '../redux/features/userSlice';
export default function Checkout(){
    let user = useAppSelector((state)=>state.userReducer.value.user)
    //User data
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.firstName);
    const [email, setEmail] = useState(user.firstName);
    const [phoneNumber, setPhoneNumber] = useState(user.firstName);
    //User address data
    const [street, setStreet] = useState(user.firstName);
    const [city, setCity] = useState(user.firstName);
    const [zip, setZip] = useState(user.firstName);
    const [country, setCountry] = useState(user.firstName);
    const [state, setState] = useState(user.firstName);

//Formats a user's phone number
    function formatPhoneNumber(phoneString: string){

    }

    return(
        <div>
            <TextField label="First Name" variant="outlined" defaultValue={user.firstName}/>
            <TextField label="Last Name" variant="outlined" defaultValue={user.lastName}/>
            <TextField label="Email" variant="outlined" defaultValue={user.lastName}/>

            <TextField label="Phone Number" variant="outlined" defaultValue={user.phoneNumber}/>

        </div>
    )
}