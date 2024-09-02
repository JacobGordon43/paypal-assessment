import React from 'react';
import { PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router-dom';

interface PaypalInterface {
  onClick: () => void;
}

export default function Paypal({ onClick }: PaypalInterface) {
  const user = useAppSelector((state) => state.userReducer.value);
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID!;
  const initialOptions: ReactPayPalScriptOptions = {
    clientId,
    currency: "USD",
    intent: "capture",
  };

  const onCreateOrder = (data: Record<string, unknown>, actions: any) => {
    console.log(user)
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: user.cart.totalPrice.toString(),
          },
          shipping: {
            address: {
              address_line_1: user.address.street,
              admin_area_2: user.address.city,
              admin_area_1: user.address.state,
              postal_code: user.address.zip,
              country_code: user.address.country,
            },
          },
        },
      ],
      payer: {
        name: {
          given_name: user.firstName,
          surname: user.lastName,
        },
        phone: {
          phone_type: "MOBILE",
          phone_number: {
            national_number: user.phoneNumber,
          },
        },
        email_address: user.email,
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
        onClick={onClick}
        createOrder={(data, actions) => onCreateOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        onCancel={() => window.alert("Transaction canceled")}
        onError={() => window.alert("There was an error with PayPal")}
      />
    </PayPalScriptProvider>
  );
}
