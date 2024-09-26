import { db } from "../data/db"
import { CartItem, GuitarT } from "../types"


export type initialStateType = {
    data: GuitarT[],
    cart: CartItem[]
}

export type CartActions =
    {type: 'add-to-cart', payload: {item: GuitarT}} |
    {type: 'delete-from-cart', payload: {id: GuitarT['id']}} |
    {type: 'aument-quantity', payload: {id: GuitarT['id']}} |
    {type: 'decrease-quantity', payload: {id: GuitarT['id']}} |
    {type: 'clear-cart'}

    const localStorageItem: ()=>CartItem[] = ()=> { 
        const localStorageCart = localStorage.getItem('cart') 
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
export const initialState: initialStateType = {
    cart: localStorageItem(),
    data: db
}
const MAX_QUANTITY = 5
const MIN_QUANTITY = 1
export const cartReducer = (state: initialStateType = initialState, action: CartActions)=> {
        if (action.type === 'add-to-cart') {
            const itemExist = state.cart.find((guitar) => guitar.id === action.payload.item.id);
                let updatedCart : CartItem[] = []
                if (itemExist) {
                    updatedCart = state.cart.map((item) => {
                        if (item.id === action.payload.item.id ) {
                            if(item.quantity < MAX_QUANTITY) {
                                return {
                                    ...item,
                                    quantity: item.quantity + 1
                                };
                            }
                            else {
                                return item
                            }
                            }  else {
                            return item
                    }
                    });
            } else {
            const newItem: CartItem = {...action.payload.item, quantity: 1}
            updatedCart = [...state.cart, newItem]
            return {
                ...state,
                cart: updatedCart
            }}
            return {
                ...state,
                cart: updatedCart
            }
        }
    if (action.type === 'delete-from-cart') {
        const updatedCart = state.cart.filter((item) => item.id !== action.payload.id)
        return {
            ...state,
            cart: updatedCart
        }
    }
    if (action.type === 'aument-quantity') {
        const updatedCart = state.cart.map((item) => {
            if (item.id === action.payload.id && item.quantity < MAX_QUANTITY) {
            return {
                ...item,
                quantity: item.quantity + 1,
            };
            }
            return item;
        });
        return {
            ...state,
            cart: updatedCart
        }
    }
    if (action.type === 'decrease-quantity') {
        const updatedCart = state.cart.map((item) => {
            if (item.id === action.payload.id && item.quantity > MIN_QUANTITY)
            return {
                ...item,
                quantity: item.quantity - 1,
            };
            return item;
        });
        return {
            ...state,
            cart: updatedCart
        }
    }
    if (action.type === 'clear-cart') {
        return {
            ...state,
            cart: []
        }
    }
    return state
}