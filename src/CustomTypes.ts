type UserState = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: Address
    cart: Cart
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

type Cart = {
    products: Product[],
    totalPrice: number
}

export type {Address, Product, UserState, Cart}