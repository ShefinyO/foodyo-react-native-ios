import { ActionCodeOperation } from "firebase/auth"

export const ADD_ITEMS_TO_CART = "ADD_ITEMS_TO_CART"
export const REMOVE_ITEMS_FROM_CART = "REMOVE_ITEMS_FROM_CART"
export const SET_MODAL_VISIBLE1 = "SET_MODAL_VISIBLE1"
export const SET_MODAL_VISIBLE2 = "SET_MODAL_VISIBLE2"
export const ADD_FIRSTLINE = "ADD_FIRSTLINE"
export const ADD_POSTCODE = "ADD_POSTCODE"
export const ADD_CONTACT = "ADD_CONTACT"
export const DELETE_ADDRESS = "DELETE_ADDRESS"
export const SELECT_ADDRESS = "SELECT_ADDRESS"
export const CLEAR_ITEMS = "CLEAR_ITEMS"
export const SET_ORDER_COMPLETED = "SET_ORDER_COMPLETED"



export const addItemsToCart=(item, shopName,shopImage)=>(
    {
        type:ADD_ITEMS_TO_CART,
        payload: {item,
                    shopName,
                shopImage}
    }
)

export const removeItemsFromCart=(item, shopName)=>(
    {
        type:REMOVE_ITEMS_FROM_CART,
        payload: {item,
            shopName}
    }
)

export const setModalVisible1=()=>(
    {
        type:SET_MODAL_VISIBLE1,
        
    }
)

export const setModalVisible2=()=>(
    {
        type:SET_MODAL_VISIBLE2,
        
    }
)

export const addFirstLine=(firstLine)=>(
    {
        type:ADD_FIRSTLINE,
        payload: firstLine
    }
)

export const addPostCode=(postCode)=>(
    {
        type:ADD_POSTCODE,
        payload: postCode
    }
)

export const addContact=(contact)=>(
    {
        type:ADD_CONTACT,
        payload: contact
    }
)

export const cleanUpAddress = ()=>(
    {
        type:DELETE_ADDRESS
}
)

export const selectedAddress=(address)=>(
    {
        type:SELECT_ADDRESS,
        payload: address
    }
)


export const clearItemState=()=>({
    type:CLEAR_ITEMS
})

export const setOrderCompleted=()=>(
    {
        type:SET_ORDER_COMPLETED
    }
)