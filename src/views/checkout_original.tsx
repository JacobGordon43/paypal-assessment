import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Typography } from "@mui/material";
import { useAppSelector } from '../redux/store';
import { useDispatch, useSelector } from "react-redux";

import { set_user } from "../redux/features/userSlice";
import Paypal from 'components/Paypal';
import ProductCard from 'components/ProductCard';
import VerifyAddress from 'backend/verify_address';

export default function Checkout() {
  const [user, setUser] = useState({
    firstName: "Jacob",
    lastName: "Gordon",
    email: "random@cox.net",
    phoneNumber: "4802500084",
    cart: {
      products: [
        { name: "T-Shirt", price: 14.99, itemNumber: 1315635 },
        { name: "Jeans", price: 16.99, itemNumber: 1315035 }
      ],
      totalPrice: 31.98,
    },
    address: {
      state: "AZ",
      country: "US",
      zip: "85304",
      street: "4435 W. Sweetwater Ave",
      city: "Glendale"
    }
  });
  const [addressValid, setAddressValid] = useState<boolean | undefined>(true);
  const [loading, setLoading] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");


  const handleOnClick = useCallback(async () => {
    console.log("handleOnClick called with:", user);
    const valid = await VerifyAddress(`${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}, ${user.address.country}`);
    setAddressValid(valid);
    setValidationMessage(valid ? "" : "Invalid Address");
    return valid;
  }, [user]);

  const handleInputChange = (field : string, value : string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };
  
  const handleAddressChange = (field : string, value : string) => {
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [field]: value,
      },
    }));
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
            {user.cart.products.length > 0 && <Paypal onClick={handleOnClick} userProp={user}/>}
          </div>
        </div>
      </div>
    </div>
  );
}
