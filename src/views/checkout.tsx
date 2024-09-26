import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Typography } from "@mui/material";
import { useAppSelector } from '../redux/store';
import { useDispatch, useSelector } from "react-redux";

import { set_user } from "../redux/features/userSlice";
import Paypal from 'components/Paypal';
import ProductCard from 'components/ProductCard';
import { useLogin } from 'backend/login';
import VerifyAddress from 'backend/verify_address';

export default function Checkout() {
  const login = useLogin();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.userReducer.value);
  const [addressValid, setAddressValid] = useState<boolean | undefined>(true);
  const [loading, setLoading] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    if (user.id === "") {
      console.log("logging in");
      login();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && user.id === "") {
      dispatch(set_user(user)); // Initialize user if not set
    }
  }, [loading, user, dispatch]);

  const handleOnClick = useCallback(async () => {
    console.log("handleOnClick called with:", user);
    const valid = await VerifyAddress(`${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}, ${user.address.country}`);
    setAddressValid(valid);
    setValidationMessage(valid ? "" : "Invalid Address");
    return valid;
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    dispatch(set_user({ ...user, [field]: value }));
    console.log(user)
  };

  const handleAddressChange = (field: string, value: string) => {
    dispatch(set_user({ ...user, address: { ...user.address, [field]: value } }));
    console.log(user)
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* User Information and Address */}
        <div className="col-12 col-lg-8">
          <Typography variant="h4" className="mb-3">Personal Information</Typography>
          <div className="row">
            <div className="col-md-6 mb-3">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={user.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={user.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={user.email}
                onChange={e => handleInputChange('email', e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={user.phoneNumber}
                onChange={e => handleInputChange('phoneNumber', e.target.value)}
              />
            </div>
          </div>
          <Typography variant="h4" className="mb-3">Address Information</Typography>
          <div className="row">
            <div className="col-md-6 mb-3">
              <TextField
                label="Country"
                variant="outlined"
                error={!addressValid}
                helperText={validationMessage}
                fullWidth
                value={user.address.country}
                onChange={e => handleAddressChange('country', e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <TextField
                label="State"
                variant="outlined"
                error={!addressValid}
                helperText={validationMessage}
                fullWidth
                value={user.address.state}
                onChange={e => handleAddressChange('state', e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <TextField
                label="City"
                variant="outlined"
                error={!addressValid}
                helperText={validationMessage}
                fullWidth
                value={user.address.city}
                onChange={e => handleAddressChange('city', e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <TextField
                label="Zipcode"
                variant="outlined"
                error={!addressValid}
                helperText={validationMessage}
                fullWidth
                value={user.address.zip}
                onChange={e => handleAddressChange('zip', e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-3">
              <TextField
                label="Street"
                variant="outlined"
                error={!addressValid}
                helperText={validationMessage}
                fullWidth
                value={user.address.street}
                onChange={e => handleAddressChange('street', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* PayPal and Cart */}
        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
          <Typography variant="h4" className="mt-4 mb-3">Your Cart</Typography>
          <div className="row">
            {user.cart.products.map((product, index) => (
              <div className="col-12 mb-3" key={index}>
                <ProductCard {...product} />
              </div>
            ))}
            <Typography variant='h5' className='mb-1'>Total:</Typography>
            <Typography variant='h5' className='mb-3'>${user.cart.totalPrice}</Typography>
            {user.cart.products.length > 0 && <Paypal onClick={handleOnClick} />}
          </div>
        </div>
      </div>
    </div>
  );
}
