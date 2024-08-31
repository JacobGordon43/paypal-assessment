import React from 'react';
import { CreateOrderBraintreeActions, PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { Product, UserState } from 'CustomTypes';
import { useAppSelector } from '../redux/store';
import { Cart } from 'CustomTypes';
import { useNavigate } from 'react-router-dom';

 export default function Paypal (cart : Cart){
    const navigagte = useNavigate();
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
                        value: cart.totalPrice.toString()
                    }, 
                    phone_number: "4802500084",
                    address: {
                        address_line_1: "4435 W. Sweewater Ave",
                        admin_area_2: "Phoenix",
                        admin_area_1: "Arizona",
                        postal_code: "85304",
                        country_code: "US"
                    }
                },

            ],         
            payer: {
                name: {
                    given_name: "Jacob",
                    surname: "Gordon", 
                }
            }, address:{
                address_line_1: "4435 W. Sweetwater Ave"
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
            <PayPalButtons onApprove={(data, actions) =>onApprove(data, actions)} createOrder={(data, actions)=>onCreateOrder(data, actions)}/>
        </PayPalScriptProvider>
    )
}

