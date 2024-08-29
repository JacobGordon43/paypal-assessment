type UserState = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: Address
    cart: Array<Product>
}

type Address = {
    country: string,
    zip: string,
    street : string,
    state: string,
    city: string
}

type Product = {
    name: string,
    price: number,
    itemNumber: number
}

export type {Address, Product, UserState}