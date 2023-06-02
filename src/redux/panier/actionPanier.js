import {ADD_TO_CART, UPDATE_TO_CART, REMOVE_TO_CART, REMOVE_ALL_CART} from './type'

export const addToCart = (productItem) => {
    return {
        type: ADD_TO_CART,
        payload: productItem
    }
}

export const updateCart = (idAndQuantity) => {
    return {
        type: UPDATE_TO_CART,
        payload: idAndQuantity
    }
}

export const removeToCart = (productId) => {
    return {
        type: REMOVE_TO_CART,
        payload: productId
    }
} 

export const removeAllCart = () => {
    return {
        type: REMOVE_ALL_CART
    }
}