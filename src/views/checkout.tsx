import React, {useEffect, useState} from 'react';
import {TextField, Typography} from "@mui/material";
import { UserState } from '../CustomTypes';
import { useAppSelector } from '../redux/store';
import { useLogin } from 'backend/login';
import Paypal from 'components/Paypal';
import ProductCard from 'components/ProductCard';
import verifyAddress from 'backend/verify_address';
export default function Checkout(){
  //Login hook is created and called into the useEffect to call it once. Prevents rerendering issues
  const login = useLogin();
  let user : UserState= useAppSelector((state)=>state.userReducer.value)

  const [addressValid, setAddressValid] = useState<null | Boolean>(true)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    console.log("logging in")
  login()
  setLoading(false);
}, [])

    //User data
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [cart, setCart] = useState(user.cart)
    //User address data
    const [street, setStreet] = useState(user.address.street);
    const [city, setCity] = useState(user.address.city);
    const [zip, setZip] = useState(user.address.zip);
    const [country, setCountry] = useState(user.address.country);
    const [state, setState] = useState(user.address.state);
    const [validationMessage, setValidationMessage] = useState("")


useEffect(()=>{
  if(!loading && user && user.id == ""){
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setStreet(user.address.street);
    setCity(user.address.city);
    setZip(user.address.zip);
    setCountry(user.address.country);
    setState(user.address.state);
    setCart(user.cart);

  }
}, [loading, user])
  user = useAppSelector((state)=>state.userReducer.value)

  const handleOnClick = () =>{
    console.log(street + ", " + city + ", " + state + " " + zip + ", " + country)
    verifyAddress(street + ", " + city + ", " + state + " " + zip + ", " + country)
    //Add new logic that sets the user's info
  }

    return (
      <div className="container mt-4">
        <div className="row">
          {/* User Information and Address */}
          <div className="col-12 col-lg-8">
            <Typography variant="h4" className="mb-3">Personal Information</Typography>
            {/* Personal Information Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <Typography variant="h4" className="mb-3">Address Information</Typography>
            {/* Address Information Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  label="Country"
                  color={addressValid ? 'success' : 'error'}
                  variant="outlined"
                  fullWidth
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  label="State"
                  color={addressValid ? 'success' : 'error'}
                  variant="outlined"
                  fullWidth
                  value={state}
                  onChange={e => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  label="City"
                  color={addressValid ? 'success' : 'error'}
                  variant="outlined"
                  fullWidth
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  label="Zipcode"
                  color={addressValid ? 'success' : 'error'}
                  variant="outlined"
                  fullWidth
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <TextField
                  label="Street"
                  color={addressValid ? 'success' : 'error'}
                  variant="outlined"
                  fullWidth
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                />
              </div>
            </div>
          </div>
    
          {/* PayPal and Cart */}
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            {/* PayPal Component */}
            <Typography variant="h4" className="mt-4 mb-3">Your Cart</Typography>
            {/* Display Cart Items */}
            <div className="row">
              {cart.products.map((product, index) => (
                <div className="col-12 mb-3" key={index}>
                  <ProductCard {...product} />
                </div>
              ))}
              <Typography variant='h5' className='mb-1'>Total:</Typography>
              <Typography variant='h5' className='mb-3'>${cart.totalPrice}</Typography>

            {(cart.products.length > 0) && <Paypal onClick={handleOnClick} cart={cart} user={user} />}
            
            </div>
          </div>
        </div>
      </div>
    );
    
    

}