import {ADD_TO_CART, UPDATE_TO_CART, REMOVE_TO_CART, REMOVE_ALL_CART} from './type'

let carts = JSON.parse(localStorage.getItem('carts'));
const initialStatePanier = {
    //product: []
    product: carts ? [...carts] : []
}

const addCartItem = (state, newData) => {
    const cartItems = [...state, newData];
    localStorage.setItem('carts', JSON.stringify(cartItems))
    return cartItems;
}

const deteteCartItem = (state, id) => {
    const filterById = state.filter(productItem => {
      return productItem.id !== id;
    })
    localStorage.setItem('carts', JSON.stringify(filterById))
    return filterById
}

const deleteAllItem = () => {
    localStorage.removeItem("carts");
    return [];
}

const panierReducer = (state = initialStatePanier, action) => {
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state, 
                //product: [...state.product, action.payload]
                product: addCartItem(state.product, action.payload)
            }
        case UPDATE_TO_CART:
            const updatedCartItems = state.product.map(item => {
                if (item.id === action.payload.id) {
                    return {
                      ...item,
                      quantity: action.payload.quantity
                    };
                }
                return item;
            });
            localStorage.setItem('carts', JSON.stringify(updatedCartItems))
            return {
                ...state, 
                product: updatedCartItems
            }
        case REMOVE_TO_CART:
            return {
                ...state, 
                product: deteteCartItem(state.product, action.payload)
            }
        case REMOVE_ALL_CART:
            return {
                ...state, 
                product: deleteAllItem()
            }
        default: return state
    }
}

export default panierReducer