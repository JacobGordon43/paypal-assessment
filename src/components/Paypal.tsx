import React, { useCallback, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { UserState } from 'CustomTypes';
import { Typography } from '@mui/material';

interface PaypalInterface {
  onClick: () => void;
  userProp: UserState;
}

export default function Paypal({ onClick, userProp }: PaypalInterface) {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID!;
  const initialOptions: ReactPayPalScriptOptions = {
    clientId,
    currency: "USD",
    intent: "capture",
  };

  const onCreateOrder = (data: Record<string, unknown>, actions: any) => {
    console.log("Creating order with userProp:", userProp);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: userProp.cart.totalPrice.toString(),
          },
          shipping: {
            address: {
              address_line_1: userProp.address.street,
              admin_area_2: userProp.address.city,
              admin_area_1: userProp.address.state,
              postal_code: userProp.address.zip,
              country_code: userProp.address.country,
            },
          },
        },
      ],
      payer: {
        name: {
          given_name: userProp.firstName,
          surname: userProp.lastName,
        },
        phone: {
          phone_type: "MOBILE",
          phone_number: {
            national_number: userProp.phoneNumber,
          },
        },
        email_address: userProp.email,
      },
    });
  };
  
  const onApprove = async (data: Record<string, unknown>, actions: any) => {
    await actions.order.capture().then((details: Record<string, unknown>) => {
      if (details.status === "APPROVED" || details.status === "COMPLETED") {
        navigate("/confirmation", { state: { orderId: details.id } });
      }
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        forceReRender={[userProp]}
        onClick={onClick}
        createOrder={(data, actions) => onCreateOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        onCancel={() => window.alert("Transaction canceled")}
        onError={() => window.alert("There was an error with PayPal")}
      />
    </PayPalScriptProvider>
  );
}
