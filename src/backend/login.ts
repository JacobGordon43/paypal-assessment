import { UserState } from "../CustomTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { login } from "../redux/features/userSlice";

//To implement for real world, add user login credential paramaters
export function useLogin() : () => boolean{
    const dispatch = useDispatch<AppDispatch>()
    //For real world implementation, create a call to the API and store the results.
    //This would also likely require a few lines of code to check the status returned, which if not 200 will return false
    const performLogin = () => {
        let results : UserState = {id: "gadjlkj-gdag-gagda", firstName: "Jacob", lastName: "Gordon", email:"random@cox.net", phoneNumber: "480-250-0084", cart: {products: [{name: "T-Shirt", price: 14.99, itemNumber: 1315635}, {name: "Jeans", price: 16.99, itemNumber: 1315035}], totalPrice: 31.98 }, address: {state: "AZ", country: "US", zip: "85304", street: "4435 W. Sweetwater Ave", city: "Glendale"}}
        dispatch(login(results))
        return true;
    }
//Returns the function itself to be called in the useEffect hook
    return performLogin
}