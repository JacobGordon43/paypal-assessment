import React from 'react';
import { CreateOrderBraintreeActions, PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { Product, UserState } from 'CustomTypes';
import { useAppSelector } from '../redux/store';
import { Cart } from 'CustomTypes';
import { useNavigate } from 'react-router-dom';

interface PaypalInterface{
    user: UserState,
    cart: Cart,
    onClick: () => void
}
 export default function Paypal ({user, cart, onClick} : PaypalInterface){
    const navigagte = useNavigate();
    console.log(user.firstName)
    const clientId : string = process.env.REACT_APP_PAYPAL_CLIENT_ID!;
        const initialOptions: ReactPayPalScriptOptions = {
            clientId: clientId,
            currency: "USD",
            intent: "capture"
    }
    //Records use keys and types. CreateOrderActions is not an available type, which is the type needed for actions. Forced to use any type.
    const onCreateOrder = (data : Record<string, unknown>, actions : any)=>{
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        // currency_code: "USD",
                        value: cart.totalPrice.toString()
                    }, 
                    shipping: {
                        address: {
                            address_line_1: "4435 W. Sweetwater Ave",
                            admin_area_2: "Phoenix",
                            admin_area_1: "AZ",
                            postal_code: "85304",
                            country_code: "US"
                        }
                    }
                },
                // {
                //     shipping: {
                //         address: {
                //             address_line_1: "2211 N First Street",

                //         }
                //     }
                // }

            ],         
            payer: {
                name: {
                    given_name: user.firstName,
                    surname: user.lastName, 
                }, 
                phone: {
                    phone_type: "MOBILE",
                    phone_number: {
                        national_number: "6238891812"
                    }
                },
                email_address: user.email,
            }
        
        })
    }

    const onApprove = async (data: Record<string, unknown>, actions : any) =>{
        const order = await actions.order.capture().then((details : Record<string, unknown>)=>{
            const id = details.id;
            console.log(details.status)
            if(details.status == "APPROVED" || details.status == "COMPLETED"){
                navigagte("/confirmation", {state: {orderId: details.id}})
            }
            console.log(id);
        });
    }

    return(
        <PayPalScriptProvider  options={initialOptions}>
            <PayPalButtons onClick={onClick} onApprove={(data, actions) =>onApprove(data, actions)} createOrder={(data, actions)=>onCreateOrder(data, actions)} onCancel={(data)=>{window.alert("Transaction cancalled")}} onError={(data)=>{(window.alert("There was an error with paypal"))}}/>
        </PayPalScriptProvider>
    )
}

